/**
 * Admin Tickets Handler
 * إدارة التذاكر
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle tickets button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const ticketsStatus = settings.ticketsEnabled ? '✅ مفعّل' : '❌ معطّل';
  const ticketsCategory = settings.ticketsCategory ? `<#${settings.ticketsCategory}>` : 'غير محدد';

  const embed = createEmbed({
    title: '🎫 إدارة التذاكر | Tickets Management',
    description: `نظام التذاكر:\n\n**الحالة:** ${ticketsStatus}\n**فئة التذاكر:** ${ticketsCategory}`,
    color: 0x0099FF,
    fields: [
      {
        name: '💡 كيفية الاستخدام',
        value: 'قم بتفعيل نظام التذاكر وتحديد فئة لإنشاء التذاكر.',
        inline: false
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'dash_admin', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Admin tickets viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
