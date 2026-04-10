/**
 * Settings Database Module
 * إدارة بيانات الإعدادات
 */

const logger = require('../utils/logger.js');
const config = require('../dashboard-config.json');

// In-memory storage (can be replaced with actual database)
const settingsData = new Map();

// Default settings
const defaultSettings = {
  language: config.defaultLanguage || 'ar',
  timezone: config.defaultTimezone || 'Asia/Riyadh',
  embedColor: '#D4AF37',
  notificationsEnabled: true,
  maintenanceMode: false,
  welcomeEnabled: false,
  welcomeChannel: null,
  welcomeMessage: 'مرحباً {user} في السيرفر!',
  logsEnabled: false,
  logsChannel: null,
  ticketsEnabled: false,
  ticketsCategory: null,
  autoResponsesEnabled: false,
  autoResponses: []
};

/**
 * Get guild settings
 * @param {string} guildId - Guild ID
 */
function getSettings(guildId) {
  return settingsData.get(guildId) || { ...defaultSettings, guildId };
}

/**
 * Get a specific setting
 * @param {string} guildId - Guild ID
 * @param {string} key - Setting key
 */
function getSetting(guildId, key) {
  const settings = getSettings(guildId);
  return settings[key] ?? defaultSettings[key];
}

/**
 * Set guild settings
 * @param {string} guildId - Guild ID
 * @param {Object} data - Settings data
 */
function setSettings(guildId, data) {
  const currentSettings = getSettings(guildId);
  const newSettings = {
    ...currentSettings,
    ...data,
    guildId,
    updatedAt: new Date().toISOString()
  };
  
  settingsData.set(guildId, newSettings);
  logger.success(`Settings updated for guild ${guildId}`);
  return newSettings;
}

/**
 * Set a specific setting
 * @param {string} guildId - Guild ID
 * @param {string} key - Setting key
 * @param {any} value - Setting value
 */
function setSetting(guildId, key, value) {
  return setSettings(guildId, { [key]: value });
}

/**
 * Reset guild settings to defaults
 * @param {string} guildId - Guild ID
 */
function resetSettings(guildId) {
  const newSettings = {
    ...defaultSettings,
    guildId,
    updatedAt: new Date().toISOString()
  };
  
  settingsData.set(guildId, newSettings);
  logger.success(`Settings reset for guild ${guildId}`);
  return newSettings;
}

/**
 * Delete guild settings
 * @param {string} guildId - Guild ID
 */
function deleteSettings(guildId) {
  const deleted = settingsData.delete(guildId);
  if (deleted) {
    logger.success(`Settings deleted for guild ${guildId}`);
  }
  return deleted;
}

/**
 * List all guilds with settings
 */
function listAllSettings() {
  return Array.from(settingsData.entries()).map(([guildId, settings]) => ({
    guildId,
    ...settings
  }));
}

module.exports = {
  getSettings,
  getSetting,
  setSettings,
  setSetting,
  resetSettings,
  deleteSettings,
  listAllSettings,
  defaultSettings
};
