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

module.exports = { renderArticle };
