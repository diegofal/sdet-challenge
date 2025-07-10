function countLogLevels(logs) {
  const counts = {};
  for (const log of logs) {
    const match = log.match(/^\[(INFO|ERROR|WARN)\]/);
    if (match) {
      const level = match[1];
      counts[level] = (counts[level] || 0) + 1;
    }
  }
  return counts;
}

module.exports = countLogLevels; 