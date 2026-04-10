/**
 * Admin Auto Responses Handler
 * إدارة الردود التلقائية
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle auto responses button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const autoResponsesStatus = settings.autoResponsesEnabled ? '✅ مفعّل' : '❌ معطّل';
  const autoResponses = settings.autoResponses || [];

  let responsesList = 'لا توجد ردود تلقائية';
  if (autoResponses.length > 0) {
    responsesList = autoResponses.slice(0, 5).map(ar => 
      `• "${ar.trigger}" → "${ar.response}"`
    ).join('\n');
  }

  const embed = createEmbed({
    title: '💬 الردود التلقائية | Auto Responses',
    description: `نظام الردود التلقائية:\n\n**الحالة:** ${autoResponsesStatus}\n**عدد الردود:** ${autoResponses.length}`,
    color: 0x0099FF,
    fields: [
      {
        name: '📋 الردود الحالية',
        value: responsesList,
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

  logger.success(`Admin auto responses viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
