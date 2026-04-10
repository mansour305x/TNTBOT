/**
 * Schedule Create Handler
 * إنشاء جدول زمني جديد
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle create schedule button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  
  // Create a new schedule with default values
  const scheduleId = `schedule_${Date.now()}`;
  const newSchedule = schedulesDb.setSchedule(guildId, scheduleId, {
    name: 'جدول جديد',
    enabled: true,
    cronExpression: '0 0 * * *', // Daily at midnight
    channelId: null,
    message: 'رسالة الجدولة',
    createdBy: interaction.user.id
  });

  const embed = createEmbed({
    title: '✅ تم إنشاء الجدول | Schedule Created',
    description: `تم إنشاء جدول زمني جديد بنجاح!\n\n**معرف الجدول:** \`${scheduleId}\`\n**الاسم:** ${newSchedule.name}\n**الحالة:** ${newSchedule.enabled ? '✅ مفعّل' : '❌ معطّل'}`,
    color: 0x00FF00
  });

  const buttons = createButtonRow([
    { customId: 'sched_edit', label: 'تعديل الجدول', style: 'primary', emoji: '✏️' },
    { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
    { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule ${scheduleId} created by ${interaction.user.tag}`);
}

module.exports = { handle };
