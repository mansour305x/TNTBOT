/**
 * Owner Error Center Handler
 * مركز الأخطاء
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logsDb = require('../../database/logs.js');
const logger = require('../../utils/logger.js');

/**
 * Handle error center button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const errorLogs = logsDb.getErrorLogs(guildId, 10);

  let errorsList = '✅ لا توجد أخطاء مسجلة.';
  if (errorLogs.length > 0) {
    errorsList = errorLogs.map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString('ar-SA');
      return `\`${time}\` • ${log.message}`;
    }).join('\n');
  }

  const embed = createEmbed({
    title: '⚠️ مركز الأخطاء | Error Center',
    description: `إجمالي الأخطاء: **${errorLogs.length}**`,
    color: errorLogs.length > 0 ? 0xFF0000 : 0x00FF00,
    fields: [
      {
        name: '📋 الأخطاء الأخيرة',
        value: errorsList,
        inline: false
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'dash_owner', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Owner error center viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
