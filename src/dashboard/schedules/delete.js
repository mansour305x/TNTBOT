/**
 * Schedule Delete Handler
 * حذف جدول زمني
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle delete schedule button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const schedules = schedulesDb.listSchedules(guildId);

  let embed;
  let buttons;

  if (schedules.length === 0) {
    embed = createEmbed({
      title: '🗑️ حذف الجدول | Delete Schedule',
      description: '📭 لا توجد جداول زمنية للحذف.\n📭 No schedules available to delete.',
      color: 0xFFAA00
    });

    buttons = createButtonRow([
      { customId: 'sched_create', label: 'إنشاء جدول جديد', style: 'success', emoji: '📝' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  } else {
    // Delete the first schedule as demonstration
    const scheduleToDelete = schedules[0];
    schedulesDb.deleteSchedule(guildId, scheduleToDelete.id);

    embed = createEmbed({
      title: '✅ تم الحذف | Schedule Deleted',
      description: `تم حذف الجدول الزمني بنجاح!\n\n**معرف الجدول:** \`${scheduleToDelete.id}\`\n**الاسم:** ${scheduleToDelete.name}`,
      color: 0x00FF00
    });

    buttons = createButtonRow([
      { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  }

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule delete action by ${interaction.user.tag}`);
}

module.exports = { handle };
