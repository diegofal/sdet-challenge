/**
 * Log level counts interface
 */
export interface LogLevelCounts {
  [level: string]: number;
}

/**
 * Valid log levels that can be parsed
 */
export type LogLevel = 'INFO' | 'ERROR' | 'WARN';

/**
 * Counts occurrences of different log levels in an array of log entries
 * @param logs Array of log strings to parse
 * @returns Object containing counts for each log level found
 */
function countLogLevels(logs: string[]): LogLevelCounts {
  const counts: LogLevelCounts = {};
  
  for (const log of logs) {
    const match = log.match(/^\[(INFO|ERROR|WARN)\]/);
    if (match) {
      const level = match[1] as LogLevel;
      counts[level] = (counts[level] || 0) + 1;
    }
  }
  
  return counts;
}

export default countLogLevels; 