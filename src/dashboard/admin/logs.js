/**
 * Admin Logs Handler
 * إدارة السجلات
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logsDb = require('../../database/logs.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle logs button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);
  const logsCount = logsDb.getLogsCount(guildId);
  const recentLogs = logsDb.getLogs(guildId, { limit: 5 });

  const logsStatus = settings.logsEnabled ? '✅ مفعّل' : '❌ معطّل';
  const logsChannel = settings.logsChannel ? `<#${settings.logsChannel}>` : 'غير محدد';

  let recentLogsList = 'لا توجد سجلات حديثة';
  if (recentLogs.length > 0) {
    recentLogsList = recentLogs.map(log => 
      `• ${log.type}: ${log.message || 'N/A'}`
    ).join('\n');
  }

  const embed = createEmbed({
    title: '📝 إدارة السجلات | Logs Management',
    description: `حالة نظام السجلات:\n\n**الحالة:** ${logsStatus}\n**القناة:** ${logsChannel}\n**عدد السجلات:** ${logsCount}`,
    color: 0x0099FF,
    fields: [
      {
        name: '📋 السجلات الأخيرة',
        value: recentLogsList,
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

  logger.success(`Admin logs viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
