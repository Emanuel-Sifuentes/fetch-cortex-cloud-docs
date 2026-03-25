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

function resolveRefDeep(obj, bundled, depth = 0) {
  if (depth > 10) return obj;
  if (obj && obj.$ref) {
    const key = obj.$ref.replace("#/__bundled__/", "");
    const resolved = bundled[key];
    if (!resolved) return { _unresolved: key };
    return resolveRefDeep(resolved, bundled, depth + 1);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => resolveRefDeep(item, bundled, depth));
  }
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = k === "__bundled__" ? v : resolveRefDeep(v, bundled, depth);
    }
    return result;
  }
  return obj;
}

function flattenSchemaFields(schema, bundled, { trackRequired = false, prefix = "", depth = 0 } = {}) {
  if (depth > 5) {
    const row = { field: prefix || "(root)", type: "[nested object]", description: "" };
    if (trackRequired) row.required = false;
    return [row];
  }
  const rows = [];
  const resolved = resolveRefDeep(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  const requiredSet = trackRequired ? new Set(resolved.required || []) : null;

  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRefDeep(prop, bundled);
    const isRequired = requiredSet ? requiredSet.has(name) : undefined;
    let desc = resolvedProp.description || "";
    const childOpts = { trackRequired, depth: depth + 1 };

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      const row = { field: fieldPath, type: "object", description: desc };
      if (trackRequired) row.required = isRequired;
      rows.push(row);
      rows.push(...flattenSchemaFields(resolvedProp, bundled, { ...childOpts, prefix: fieldPath }));
    } else if (resolvedProp.type === "array") {
      const items = resolveRefDeep(resolvedProp.items || {}, bundled);
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
          (v) => resolveRefDeep(v, bundled).type || "any"
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
      const header = resolveRefDeep(headerRef, bundled);
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

  const bodyContent = data.request?.body?.content;
  if (bodyContent) {
    const contentType = Object.keys(bodyContent)[0] || "application/json";
    const mediaType = bodyContent[contentType];
    if (mediaType?.schema) {
      lines.push(`## Request Body (\`${contentType}\`)`, "");
      lines.push("| Field | Type | Required | Description |");
      lines.push("|-------|------|----------|-------------|");
      const rows = flattenSchemaFields(mediaType.schema, bundled, { trackRequired: true });
      for (const row of rows) {
        lines.push(
          `| ${row.field} | ${row.type} | ${row.required ? "yes" : "no"} | ${row.description} |`
        );
      }
      lines.push("");
    }

    if (mediaType?.examples) {
      for (const [name, example] of Object.entries(mediaType.examples)) {
        lines.push(`### Request Example \u2014 ${name}`, "");
        lines.push("```json");
        lines.push(JSON.stringify(example.value, null, 2));
        lines.push("```", "");
      }
    }
  }

  if (data.responses) {
    for (const [status, response] of Object.entries(data.responses)) {
      const statusText = response.description || "";
      lines.push(
        `## Response (${status}${statusText ? " " + statusText : ""})`,
        ""
      );
      const respContent = response.content;
      if (respContent) {
        const respContentType = Object.keys(respContent)[0];
        const respMedia = respContent[respContentType];
        if (respMedia?.schema) {
          lines.push("| Field | Type | Description |");
          lines.push("|-------|------|-------------|");
          const respRows = flattenSchemaFields(respMedia.schema, bundled);
          for (const row of respRows) {
            lines.push(`| ${row.field} | ${row.type} | ${row.description} |`);
          }
          lines.push("");
        }
        if (respMedia?.examples) {
          for (const [name, example] of Object.entries(respMedia.examples)) {
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
    }
  }

  return lines.join("\n");
}

module.exports = { renderArticle, renderHttpService, renderHttpOperation };
