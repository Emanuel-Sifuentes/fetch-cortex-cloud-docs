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
      lines.push(`- **${tag.name}** \u2014 ${tag.description}`);
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

function flattenSchema(schema, bundled, prefix = "", depth = 0) {
  if (depth > 5) {
    return [
      {
        field: prefix || "(root)",
        type: "[nested object]",
        required: false,
        description: "",
      },
    ];
  }
  const rows = [];
  const resolved = resolveRefDeep(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  const requiredSet = new Set(resolved.required || []);
  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRefDeep(prop, bundled);
    const isRequired = requiredSet.has(name);
    let desc = resolvedProp.description || "";

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      rows.push({
        field: fieldPath,
        type: "object",
        required: isRequired,
        description: desc,
      });
      rows.push(...flattenSchema(resolvedProp, bundled, fieldPath, depth + 1));
    } else if (resolvedProp.type === "array") {
      rows.push({
        field: fieldPath,
        type: "array",
        required: isRequired,
        description: desc,
      });
      const items = resolveRefDeep(resolvedProp.items || {}, bundled);
      if (items.type === "object" && items.properties) {
        rows.push(
          ...flattenSchema(items, bundled, `${fieldPath}[]`, depth + 1)
        );
      }
    } else {
      let type = resolvedProp.type || "any";
      if (resolvedProp.oneOf || resolvedProp.anyOf) {
        const variants = (resolvedProp.oneOf || resolvedProp.anyOf).map(
          (v) => resolveRefDeep(v, bundled).type || "any"
        );
        type = variants.join(" \\| ");
      }
      if (resolvedProp.enum) {
        const enumStr = resolvedProp.enum.map((e) => `\`${e}\``).join(", ");
        desc = desc ? `${desc} enum: ${enumStr}` : `enum: ${enumStr}`;
      }
      rows.push({ field: fieldPath, type, required: isRequired, description: desc });
    }
  }
  return rows;
}

function flattenResponseSchema(schema, bundled, prefix = "", depth = 0) {
  if (depth > 5) {
    return [
      { field: prefix || "(root)", type: "[nested object]", description: "" },
    ];
  }
  const rows = [];
  const resolved = resolveRefDeep(schema, bundled);
  if (!resolved || !resolved.properties) return rows;

  for (const [name, prop] of Object.entries(resolved.properties)) {
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const resolvedProp = resolveRefDeep(prop, bundled);
    const desc = resolvedProp.description || "";

    if (resolvedProp.type === "object" && resolvedProp.properties) {
      rows.push({ field: fieldPath, type: "object", description: desc });
      rows.push(
        ...flattenResponseSchema(resolvedProp, bundled, fieldPath, depth + 1)
      );
    } else if (resolvedProp.type === "array") {
      const items = resolveRefDeep(resolvedProp.items || {}, bundled);
      if (items.type === "object" && items.properties) {
        rows.push({ field: fieldPath, type: "array", description: desc });
        rows.push(
          ...flattenResponseSchema(items, bundled, `${fieldPath}[]`, depth + 1)
        );
      } else {
        const itemType = items.type || "any";
        rows.push({
          field: fieldPath,
          type: `array of ${itemType}s`,
          description: desc,
        });
      }
    } else {
      let type = resolvedProp.type || "any";
      if (resolvedProp.oneOf || resolvedProp.anyOf) {
        const variants = (resolvedProp.oneOf || resolvedProp.anyOf).map(
          (v) => resolveRefDeep(v, bundled).type || "any"
        );
        type = variants.join(" \\| ");
      }
      rows.push({ field: fieldPath, type, description: desc });
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

  // Request headers
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

  // Request body
  const bodyContent = data.request?.body?.content;
  if (bodyContent) {
    const contentType = Object.keys(bodyContent)[0] || "application/json";
    const mediaType = bodyContent[contentType];
    if (mediaType?.schema) {
      lines.push(`## Request Body (\`${contentType}\`)`, "");
      lines.push("| Field | Type | Required | Description |");
      lines.push("|-------|------|----------|-------------|");
      const rows = flattenSchema(mediaType.schema, bundled);
      for (const row of rows) {
        lines.push(
          `| ${row.field} | ${row.type} | ${row.required ? "yes" : "no"} | ${row.description} |`
        );
      }
      lines.push("");
    }

    // Request examples
    if (mediaType?.examples) {
      for (const [name, example] of Object.entries(mediaType.examples)) {
        lines.push(`### Request Example \u2014 ${name}`, "");
        lines.push("```json");
        lines.push(JSON.stringify(example.value, null, 2));
        lines.push("```", "");
      }
    }
  }

  // Responses
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
          const respRows = flattenResponseSchema(respMedia.schema, bundled);
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
