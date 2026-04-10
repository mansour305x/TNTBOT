/**
 * Settings Language Handler
 * إعدادات اللغة
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle language button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const currentLanguage = settings.language === 'ar' ? 'العربية 🇸🇦' : 'English 🇺🇸';

  const embed = createEmbed({
    title: '🌐 إعدادات اللغة | Language Settings',
    description: `اللغة الحالية: **${currentLanguage}**\n\nاختر اللغة المفضلة للبوت.`,
    color: 0x0099FF,
    fields: [
      {
        name: '🇸🇦 العربية',
        value: 'اللغة العربية',
        inline: true
      },
      {
        name: '🇺🇸 English',
        value: 'English Language',
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

  logger.success(`Settings language viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
