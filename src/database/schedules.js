/**
 * Schedules Database Module
 * إدارة بيانات الجداول الزمنية
 */

const logger = require('../utils/logger.js');

// In-memory storage (can be replaced with actual database)
const schedulesData = new Map();

/**
 * Get a schedule by ID
 * @param {string} guildId - Guild ID
 * @param {string} scheduleId - Schedule ID
 */
function getSchedule(guildId, scheduleId) {
  const guildSchedules = schedulesData.get(guildId) || new Map();
  return guildSchedules.get(scheduleId) || null;
}

/**
 * Get all schedules for a guild
 * @param {string} guildId - Guild ID
 */
function listSchedules(guildId) {
  const guildSchedules = schedulesData.get(guildId);
  if (!guildSchedules) return [];
  return Array.from(guildSchedules.values());
}

/**
 * Create or update a schedule
 * @param {string} guildId - Guild ID
 * @param {string} scheduleId - Schedule ID
 * @param {Object} data - Schedule data
 */
function setSchedule(guildId, scheduleId, data) {
  if (!schedulesData.has(guildId)) {
    schedulesData.set(guildId, new Map());
  }
  
  const guildSchedules = schedulesData.get(guildId);
  const schedule = {
    id: scheduleId,
    ...data,
    createdAt: guildSchedules.get(scheduleId)?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  guildSchedules.set(scheduleId, schedule);
  logger.success(`Schedule ${scheduleId} saved for guild ${guildId}`);
  return schedule;
}

/**
 * Delete a schedule
 * @param {string} guildId - Guild ID
 * @param {string} scheduleId - Schedule ID
 */
function deleteSchedule(guildId, scheduleId) {
  const guildSchedules = schedulesData.get(guildId);
  if (!guildSchedules) return false;
  
  const deleted = guildSchedules.delete(scheduleId);
  if (deleted) {
    logger.success(`Schedule ${scheduleId} deleted from guild ${guildId}`);
  }
  return deleted;
}

/**
 * Toggle schedule enabled status
 * @param {string} guildId - Guild ID
 * @param {string} scheduleId - Schedule ID
 */
function toggleSchedule(guildId, scheduleId) {
  const schedule = getSchedule(guildId, scheduleId);
  if (!schedule) return null;
  
  schedule.enabled = !schedule.enabled;
  schedule.updatedAt = new Date().toISOString();
  
  const guildSchedules = schedulesData.get(guildId);
  guildSchedules.set(scheduleId, schedule);
  
  logger.success(`Schedule ${scheduleId} toggled to ${schedule.enabled ? 'enabled' : 'disabled'}`);
  return schedule;
}

/**
 * Duplicate a schedule
 * @param {string} guildId - Guild ID
 * @param {string} scheduleId - Schedule ID
 */
function duplicateSchedule(guildId, scheduleId) {
  const schedule = getSchedule(guildId, scheduleId);
  if (!schedule) return null;
  
  const newId = `${scheduleId}_copy_${Date.now()}`;
  const newSchedule = {
    ...schedule,
    id: newId,
    name: `${schedule.name} (نسخة)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const guildSchedules = schedulesData.get(guildId);
  guildSchedules.set(newId, newSchedule);
  
  logger.success(`Schedule ${scheduleId} duplicated as ${newId}`);
  return newSchedule;
}

/**
 * Get schedules count for a guild
 * @param {string} guildId - Guild ID
 */
function getSchedulesCount(guildId) {
  const guildSchedules = schedulesData.get(guildId);
  return guildSchedules ? guildSchedules.size : 0;
}

module.exports = {
  getSchedule,
  listSchedules,
  setSchedule,
  deleteSchedule,
  toggleSchedule,
  duplicateSchedule,
  getSchedulesCount
};
