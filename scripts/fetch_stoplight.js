const crypto = require("crypto");

const INCLUDED_TYPES = new Set(["article", "http_service", "http_operation"]);

function hashContent(dataString) {
  return "sha256:" + crypto.createHash("sha256").update(dataString).digest("hex");
}

function filterTocNodes(items, serviceName = null) {
  const result = [];
  for (const item of items) {
    const currentService =
      item.type === "http_service" ? item.title : serviceName;
    if (INCLUDED_TYPES.has(item.type)) {
      result.push({
        type: item.type,
        title: item.title,
        slug: item.slug,
        serviceName:
          item.type === "http_operation" ? currentService || null : null,
      });
    }
    if (item.items) {
      result.push(...filterTocNodes(item.items, currentService));
    }
  }
  return result;
}

module.exports = { hashContent, filterTocNodes };
