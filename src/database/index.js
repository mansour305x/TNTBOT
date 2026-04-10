/**
 * Database index - تصدير كل وحدات قاعدة البيانات
 */

const schedules = require('./schedules.js');
const settings = require('./settings.js');
const logs = require('./logs.js');

module.exports = {
  schedules,
  settings,
  logs
};
