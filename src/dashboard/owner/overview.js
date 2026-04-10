/**
 * Owner Overview Handler
 * نظرة عامة على النظام
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logsDb = require('../../database/logs.js');
const logger = require('../../utils/logger.js');

/**
 * Handle overview button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const guild = interaction.guild;

  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  const memoryUsage = process.memoryUsage();
  const memoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);

  const embed = createEmbed({
    title: '👁️ نظرة عامة | Overview',
    description: 'لوحة معلومات شاملة عن حالة البوت.',
    color: 0xD4AF37,
    fields: [
      {
        name: '⏱️ وقت التشغيل',
        value: `${hours}h ${minutes}m ${seconds}s`,
        inline: true
      },
      {
        name: '💾 استخدام الذاكرة',
        value: `${memoryMB} MB`,
        inline: true
      },
      {
        name: '🏠 السيرفرات',
        value: '1',
        inline: true
      },
      {
        name: '👥 الأعضاء',
        value: `${guild.memberCount}`,
        inline: true
      },
      {
        name: '📅 الجداول',
        value: `${schedulesDb.getSchedulesCount(guildId)}`,
        inline: true
      },
      {
        name: '📝 السجلات',
        value: `${logsDb.getLogsCount(guildId)}`,
        inline: true
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

  logger.success(`Owner overview viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
