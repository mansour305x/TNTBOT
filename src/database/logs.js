/**
 * Logs Database Module
 * إدارة بيانات السجلات
 */

const logger = require('../utils/logger.js');

// In-memory storage (can be replaced with actual database)
const logsData = new Map();
const MAX_LOGS_PER_GUILD = 1000;

/**
 * Log types
 */
const LogTypes = {
  COMMAND: 'command',
  BUTTON: 'button',
  ERROR: 'error',
  SCHEDULE: 'schedule',
  ADMIN: 'admin',
  SYSTEM: 'system'
};

/**
 * Add a log entry
 * @param {string} guildId - Guild ID
 * @param {Object} logEntry - Log entry data
 */
function addLog(guildId, logEntry) {
  if (!logsData.has(guildId)) {
    logsData.set(guildId, []);
  }
  
  const guildLogs = logsData.get(guildId);
  const entry = {
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
    ...logEntry,
    timestamp: new Date().toISOString()
  };
  
  guildLogs.unshift(entry);
  
  // Keep only last MAX_LOGS_PER_GUILD entries
  if (guildLogs.length > MAX_LOGS_PER_GUILD) {
    guildLogs.splice(MAX_LOGS_PER_GUILD);
  }
  
  return entry;
}

/**
 * Get logs for a guild
 * @param {string} guildId - Guild ID
 * @param {Object} options - Filter options
 */
function getLogs(guildId, options = {}) {
  const guildLogs = logsData.get(guildId) || [];
  let filteredLogs = [...guildLogs];
  
  if (options.type) {
    filteredLogs = filteredLogs.filter(log => log.type === options.type);
  }
  
  if (options.userId) {
    filteredLogs = filteredLogs.filter(log => log.userId === options.userId);
  }
  
  if (options.limit) {
    filteredLogs = filteredLogs.slice(0, options.limit);
  }
  
  return filteredLogs;
}

/**
 * Get a specific log by ID
 * @param {string} guildId - Guild ID
 * @param {string} logId - Log ID
 */
function getLog(guildId, logId) {
  const guildLogs = logsData.get(guildId) || [];
  return guildLogs.find(log => log.id === logId) || null;
}

/**
 * Delete a log entry
 * @param {string} guildId - Guild ID
 * @param {string} logId - Log ID
 */
function deleteLog(guildId, logId) {
  const guildLogs = logsData.get(guildId);
  if (!guildLogs) return false;
  
  const index = guildLogs.findIndex(log => log.id === logId);
  if (index === -1) return false;
  
  guildLogs.splice(index, 1);
  return true;
}

/**
 * Clear all logs for a guild
 * @param {string} guildId - Guild ID
 */
function clearLogs(guildId) {
  logsData.set(guildId, []);
  logger.success(`Logs cleared for guild ${guildId}`);
  return true;
}

/**
 * Get logs count for a guild
 * @param {string} guildId - Guild ID
 */
function getLogsCount(guildId) {
  const guildLogs = logsData.get(guildId);
  return guildLogs ? guildLogs.length : 0;
}

/**
 * Get error logs for a guild
 * @param {string} guildId - Guild ID
 * @param {number} limit - Max number of logs to return
 */
function getErrorLogs(guildId, limit = 50) {
  return getLogs(guildId, { type: LogTypes.ERROR, limit });
}

/**
 * Log an error
 * @param {string} guildId - Guild ID
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
function logError(guildId, error, context = {}) {
  return addLog(guildId, {
    type: LogTypes.ERROR,
    message: error.message,
    stack: error.stack,
    ...context
  });
}

module.exports = {
  LogTypes,
  addLog,
  getLogs,
  getLog,
  deleteLog,
  clearLogs,
  getLogsCount,
  getErrorLogs,
  logError
};
