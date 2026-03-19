function flattenToc(nodes, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ contentId: node.contentId, tocId: node.tocId, title: node.title, depth });
    if (node.children && node.children.length) {
      result.push(...flattenToc(node.children, depth + 1));
    }
  }
  return result;
}

module.exports = { flattenToc };
