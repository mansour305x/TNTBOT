/**
 * Schedule List Handler
 * عرض قائمة الجداول الزمنية
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle list schedules button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const schedules = schedulesDb.listSchedules(guildId);

  let description;
  if (schedules.length === 0) {
    description = '📭 لا توجد جداول زمنية حالياً.\n📭 No schedules found.';
  } else {
    description = schedules.map((schedule, index) => {
      const status = schedule.enabled ? '✅' : '❌';
      return `**${index + 1}.** ${status} \`${schedule.id}\`\n   📝 ${schedule.name}`;
    }).join('\n\n');
  }

  const embed = createEmbed({
    title: '📋 قائمة الجداول | Schedules List',
    description: description,
    color: 0x0099FF,
    fields: [
      {
        name: '📊 الإحصائيات | Statistics',
        value: `**المجموع:** ${schedules.length}\n**المفعّلة:** ${schedules.filter(s => s.enabled).length}\n**المعطّلة:** ${schedules.filter(s => !s.enabled).length}`,
        inline: true
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'sched_create', label: 'إنشاء جدول جديد', style: 'success', emoji: '📝' },
    { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedules list viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
