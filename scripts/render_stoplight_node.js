function escapeTitle(title) {
  return title.replace(/"/g, '\\"');
}

function renderArticle(node) {
  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: article",
    `slug: "${node.slug}"`,
    `sourceProject: ${node.sourceProject}`,
    "---",
    "",
    node.data,
    "",
  ];
  return lines.join("\n");
}

function renderHttpService(node) {
  const data = JSON.parse(node.data);
  const serverUrl = data.servers?.[0]?.url || "";
  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: http_service",
    `slug: "${node.slug}"`,
    `sourceProject: ${node.sourceProject}`,
  ];
  if (serverUrl) lines.push(`serverUrl: "${serverUrl}"`);
  lines.push("---", "", `# ${data.name || node.title}`, "");
  if (data.description) lines.push(data.description, "");
  if (data.tags && data.tags.length > 0) {
    lines.push("## API Categories", "");
    for (const tag of data.tags) {
      lines.push(`- **${tag.name}** \u2014 ${tag.description || ""}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function resolveRef(obj, bundled, depth = 0) {
  if (depth > 10 || !obj || !obj.$ref) return obj;
  const key = obj.$ref.replace("#/__bundled__/", "");
  const resolved = bundled[key];
  if (!resolved) return { _unresolved: key };
  if (resolved.$ref) return resolveRef(resolved, bundled, depth + 1);
  return resolved;
}

function flattenSchemaFields(schema, bundled, { trackRequired = false, prefix = "", depth = 0 } = {}) {
  if (depth > 5) {
    const row = { field: prefix || "(root)", type: "[nested object]", description: "" };
    if (trackRequired) row.required = false;
    return [row];
  }
  const rows = [];
  const resolved = resolveRef(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  const requiredSet = trackRequired ? new Set(resolved.required || []) : null;

  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRef(prop, bundled);
    const isRequired = requiredSet ? requiredSet.has(name) : undefined;
    let desc = resolvedProp.description || "";
    const childOpts = { trackRequired, depth: depth + 1 };

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      const row = { field: fieldPath, type: "object", description: desc };
      if (trackRequired) row.required = isRequired;
      rows.push(row);
      rows.push(...flattenSchemaFields(resolvedProp, bundled, { ...childOpts, prefix: fieldPath }));
    } else if (resolvedProp.type === "array") {
      const items = resolveRef(resolvedProp.items || {}, bundled);
      if (items.type === "object" && items.properties) {
        const row = { field: fieldPath, type: "array", description: desc };
        if (trackRequired) row.required = isRequired;
        rows.push(row);
        rows.push(...flattenSchemaFields(items, bundled, { ...childOpts, prefix: `${fieldPath}[]` }));
      } else if (!trackRequired) {
        const itemType = items.type || "any";
        rows.push({ field: fieldPath, type: `array of ${itemType}s`, description: desc });
      } else {
        rows.push({ field: fieldPath, type: "array", required: isRequired, description: desc });
      }
    } else {
      let type = resolvedProp.type || "any";
      if (resolvedProp.oneOf || resolvedProp.anyOf) {
        const variants = (resolvedProp.oneOf || resolvedProp.anyOf).map(
          (v) => resolveRef(v, bundled).type || "any"
        );
        type = variants.join(" \\| ");
      }
      if (trackRequired && resolvedProp.enum) {
        const enumStr = resolvedProp.enum.map((e) => `\`${e}\``).join(", ");
        desc = desc ? `${desc} enum: ${enumStr}` : `enum: ${enumStr}`;
      }
      const row = { field: fieldPath, type, description: desc };
      if (trackRequired) row.required = isRequired;
      rows.push(row);
    }
  }
  return rows;
}

function renderHttpOperation(node, { serviceName, serverUrl }) {
  const data = JSON.parse(node.data);
  const bundled = data.__bundled__ || {};
  const effectiveServerUrl = data.servers?.[0]?.url || serverUrl || "";
  const method = (data.method || "get").toLowerCase();

  const lines = [
    "---",
    `title: "${escapeTitle(node.title)}"`,
    "type: http_operation",
    `method: ${method}`,
    `path: "${data.path}"`,
  ];
  if (serviceName) lines.push(`service: "${escapeTitle(serviceName)}"`);
  lines.push(`slug: "${node.slug}"`);
  lines.push(`sourceProject: ${node.sourceProject}`);
  if (effectiveServerUrl) lines.push(`serverUrl: "${effectiveServerUrl}"`);
  lines.push("---", "");
  lines.push(`# ${node.title}`, "");
  lines.push(`**\`${method.toUpperCase()} ${data.path}\`**`, "");
  if (data.description) lines.push(data.description, "");

  const headers = data.request?.headers || [];
  if (headers.length > 0) {
    lines.push("## Request Headers", "");
    lines.push("| Name | Required | Description |");
    lines.push("|------|----------|-------------|");
    for (const headerRef of headers) {
      const header = resolveRef(headerRef, bundled);
      if (header._unresolved) {
        lines.push(
          `| [unresolved ref: ${header._unresolved}] | - | - |`
        );
        continue;
      }
      const req = header.required ? "yes" : "no";
      lines.push(`| ${header.name} | ${req} | ${header.description || ""} |`);
    }
    lines.push("");
  }

  const resolvedBody = resolveRef(data.request?.body, bundled);
  const bodyContents = resolvedBody?.contents || [];
  for (const contentRef of bodyContents) {
    const media = resolveRef(contentRef, bundled);
    if (!media) continue;
    const contentType = media.mediaType || "application/json";
    if (media.schema) {
      lines.push(`## Request Body (\`${contentType}\`)`, "");
      lines.push("| Field | Type | Required | Description |");
      lines.push("|-------|------|----------|-------------|");
      const rows = flattenSchemaFields(media.schema, bundled, { trackRequired: true });
      for (const row of rows) {
        lines.push(
          `| ${row.field} | ${row.type} | ${row.required ? "yes" : "no"} | ${row.description} |`
        );
      }
      lines.push("");
    }

    const examples = media.examples || [];
    for (const exRef of examples) {
      const example = resolveRef(exRef, bundled);
      if (!example?.value) continue;
      const name = example.key || "default";
      lines.push(`### Request Example \u2014 ${name}`, "");
      lines.push("```json");
      lines.push(JSON.stringify(example.value, null, 2));
      lines.push("```", "");
    }
  }

  const responses = data.responses || [];
  for (const respRef of responses) {
    const response = resolveRef(respRef, bundled);
    if (!response) continue;
    const status = response.code || "";
    const statusText = response.description || "";
    lines.push(
      `## Response (${status}${statusText ? " " + statusText : ""})`,
      ""
    );
    const respContents = response.contents || [];
    for (const contentRef of respContents) {
      const respMedia = resolveRef(contentRef, bundled);
      if (!respMedia) continue;
      if (respMedia.schema) {
        lines.push("| Field | Type | Description |");
        lines.push("|-------|------|-------------|");
        const respRows = flattenSchemaFields(respMedia.schema, bundled);
        for (const row of respRows) {
          lines.push(`| ${row.field} | ${row.type} | ${row.description} |`);
        }
        lines.push("");
      }
      const respExamples = respMedia.examples || [];
      for (const exRef of respExamples) {
        const example = resolveRef(exRef, bundled);
        if (!example?.value) continue;
        const name = example.key || "default";
        const label =
          name === "default"
            ? "Response Example"
            : `Response Example \u2014 ${name}`;
        lines.push(`### ${label}`, "");
        lines.push("```json");
        lines.push(JSON.stringify(example.value, null, 2));
        lines.push("```", "");
      }
    }
  }

  return lines.join("\n");
}

module.exports = { renderArticle, renderHttpService, renderHttpOperation };
