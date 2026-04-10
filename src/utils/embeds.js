/**
 * Embed utilities for TNT Dashboard
 * دوال Embeds موحدة
 */

const { EmbedBuilder } = require('discord.js');

const COLORS = {
  primary: 0xD4AF37,    // Gold
  secondary: 0xC0C0C0,  // Silver
  success: 0x00FF00,    // Green
  danger: 0xFF0000,     // Red
  info: 0x0099FF,       // Blue
  warning: 0xFFAA00     // Orange
};

/**
 * Create a basic embed
 * @param {Object} options - Embed options
 */
function createEmbed(options = {}) {
  const embed = new EmbedBuilder()
    .setColor(options.color || COLORS.primary)
    .setTimestamp();

  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.footer) embed.setFooter({ text: options.footer });
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);
  if (options.author) embed.setAuthor(options.author);
  if (options.fields) embed.addFields(options.fields);

  return embed;
}

/**
 * Create main dashboard embed
 */
function createMainDashboardEmbed() {
  return createEmbed({
    title: '🎛️ لوحة تحكم تي ان تي | TNT Control Panel',
    description: 'اختر القسم الذي تريد التحكم به من الأزرار أدناه.',
    color: COLORS.primary,
    footer: '👑 TNT 1478 Control Center'
  });
}

/**
 * Create schedules section embed
 */
function createSchedulesEmbed() {
  return createEmbed({
    title: '📅 الجداول | نظام الجدولة',
    description: 'إدارة جميع الجداول الزمنية للبوت.',
    color: COLORS.info,
    footer: '👑 TNT 1478 Control Center'
  });
}

/**
 * Create admin section embed
 */
function createAdminEmbed() {
  return createEmbed({
    title: '🛠️ الإدارة | إدارة السيرفر',
    description: 'إدارة إعدادات السيرفر والصلاحيات.',
    color: COLORS.secondary,
    footer: '👑 TNT 1478 Control Center'
  });
}

/**
 * Create settings section embed
 */
function createSettingsEmbed() {
  return createEmbed({
    title: '⚙️ الإعدادات | Settings',
    description: 'تخصيص إعدادات البوت.',
    color: COLORS.secondary,
    footer: '👑 TNT 1478 Control Center'
  });
}

/**
 * Create AI section embed
 */
function createAIEmbed() {
  return createEmbed({
    title: '🤖 ذكي | الحاسبات الذكية',
    description: 'أنظمة الذكاء الاصطناعي والتحليلات.',
    color: COLORS.info,
    footer: '👑 TNT 1478 Control Center'
  });
}

/**
 * Create owner section embed
 */
function createOwnerEmbed() {
  return createEmbed({
    title: '👑 مالك | لوحة المالك',
    description: 'لوحة تحكم حصرية لمالك البوت.',
    color: COLORS.danger,
    footer: '👑 TNT 1478 Control Center • Owner Only'
  });
}

/**
 * Create success embed
 * @param {string} message - Success message
 */
function createSuccessEmbed(message) {
  return createEmbed({
    title: '✅ نجاح | Success',
    description: message,
    color: COLORS.success
  });
}

/**
 * Create error embed
 * @param {string} message - Error message
 */
function createErrorEmbed(message) {
  return createEmbed({
    title: '❌ خطأ | Error',
    description: message,
    color: COLORS.danger
  });
}

/**
 * Create warning embed
 * @param {string} message - Warning message
 */
function createWarningEmbed(message) {
  return createEmbed({
    title: '⚠️ تحذير | Warning',
    description: message,
    color: COLORS.warning
  });
}

module.exports = {
  COLORS,
  createEmbed,
  createMainDashboardEmbed,
  createSchedulesEmbed,
  createAdminEmbed,
  createSettingsEmbed,
  createAIEmbed,
  createOwnerEmbed,
  createSuccessEmbed,
  createErrorEmbed,
  createWarningEmbed
};
