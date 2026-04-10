/**
 * Settings Timezone Handler
 * إعدادات المنطقة الزمنية
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle timezone button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const currentTimezone = settings.timezone || 'Asia/Riyadh';
  const currentTime = new Date().toLocaleString('ar-SA', { timeZone: currentTimezone });

  const embed = createEmbed({
    title: '🕐 المنطقة الزمنية | Timezone Settings',
    description: `المنطقة الزمنية الحالية: **${currentTimezone}**\n\nالوقت الحالي: **${currentTime}**`,
    color: 0x0099FF,
    fields: [
      {
        name: '💡 المناطق الشائعة',
        value: '• Asia/Riyadh (الرياض)\n• Asia/Dubai (دبي)\n• Europe/London (لندن)\n• America/New_York (نيويورك)',
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

  logger.success(`Settings timezone viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
