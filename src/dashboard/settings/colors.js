/**
 * Settings Colors Handler
 * إعدادات الألوان
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle colors button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const currentColor = settings.embedColor || '#D4AF37';

  const embed = createEmbed({
    title: '🎨 إعدادات الألوان | Color Settings',
    description: `لون الـ Embed الحالي: **${currentColor}**\n\nاختر لون الثيم للبوت.`,
    color: parseInt(currentColor.replace('#', ''), 16),
    fields: [
      {
        name: '🎨 الألوان المتاحة',
        value: '• 🟡 ذهبي: #D4AF37\n• 🔵 أزرق: #0099FF\n• 🟢 أخضر: #00FF00\n• 🔴 أحمر: #FF0000\n• 🟣 بنفسجي: #9B59B6',
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

  logger.success(`Settings colors viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
