/**
 * Settings Notifications Handler
 * إعدادات الإشعارات
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle notifications button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const notificationsStatus = settings.notificationsEnabled ? '✅ مفعّلة' : '❌ معطّلة';

  const embed = createEmbed({
    title: '🔔 إعدادات الإشعارات | Notification Settings',
    description: `حالة الإشعارات: **${notificationsStatus}**\n\nتحكم في إشعارات البوت.`,
    color: 0x0099FF,
    fields: [
      {
        name: '📋 أنواع الإشعارات',
        value: '• إشعارات الأحداث\n• إشعارات الأخطاء\n• إشعارات الجداول\n• إشعارات الترحيب',
        inline: false
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'dash_settings', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Settings notifications viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
