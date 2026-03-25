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

module.exports = { renderArticle, renderHttpService };
