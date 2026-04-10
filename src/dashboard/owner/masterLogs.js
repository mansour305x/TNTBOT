/**
 * Owner Master Logs Handler
 * السجلات المتقدمة
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logsDb = require('../../database/logs.js');
const logger = require('../../utils/logger.js');

/**
 * Handle master logs button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const logsCount = logsDb.getLogsCount(guildId);
  const recentLogs = logsDb.getLogs(guildId, { limit: 10 });

  let logsList = 'لا توجد سجلات.';
  if (recentLogs.length > 0) {
    logsList = recentLogs.map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString('ar-SA');
      return `\`${time}\` • ${log.type}: ${log.message || 'N/A'}`;
    }).join('\n');
  }

  const embed = createEmbed({
    title: '📊 السجلات المتقدمة | Master Logs',
    description: `إجمالي السجلات: **${logsCount}**`,
    color: 0xD4AF37,
    fields: [
      {
        name: '📋 آخر السجلات',
        value: logsList,
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

  logger.success(`Owner master logs viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
