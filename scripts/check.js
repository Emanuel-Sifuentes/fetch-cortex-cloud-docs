function diffTopics(oldTopics, newTopics) {
  const oldIds = oldTopics.map((t) => t.contentId);
  const newIds = newTopics.map((t) => t.contentId);
  const oldSet = new Set(oldIds);
  const newSet = new Set(newIds);

  const added = newIds.filter((id) => !oldSet.has(id));
  const removed = oldIds.filter((id) => !newSet.has(id));

  const oldIntersection = oldIds.filter((id) => newSet.has(id));
  const newIntersection = newIds.filter((id) => oldSet.has(id));
  const reordered =
    oldIntersection.length > 0 &&
    JSON.stringify(oldIntersection) !== JSON.stringify(newIntersection);

  return { added, removed, reordered };
}

module.exports = { diffTopics };
