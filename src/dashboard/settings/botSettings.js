/**
 * Settings Bot Settings Handler
 * إعدادات البوت العامة
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle bot settings button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const maintenanceStatus = settings.maintenanceMode ? '✅ مفعّل' : '❌ معطّل';

  const embed = createEmbed({
    title: '🤖 إعدادات البوت | Bot Settings',
    description: 'إعدادات البوت العامة.',
    color: 0x0099FF,
    fields: [
      {
        name: '🔧 وضع الصيانة',
        value: maintenanceStatus,
        inline: true
      },
      {
        name: '🌐 اللغة',
        value: settings.language === 'ar' ? 'العربية' : 'English',
        inline: true
      },
      {
        name: '🕐 المنطقة الزمنية',
        value: settings.timezone || 'Asia/Riyadh',
        inline: true
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

  logger.success(`Settings bot settings viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
