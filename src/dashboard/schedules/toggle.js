/**
 * Schedule Toggle Handler
 * تمكين / تعطيل جدول زمني
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle toggle schedule button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const schedules = schedulesDb.listSchedules(guildId);

  let embed;
  let buttons;

  if (schedules.length === 0) {
    embed = createEmbed({
      title: '🔘 تمكين / تعطيل | Toggle Schedule',
      description: '📭 لا توجد جداول زمنية للتبديل.\n📭 No schedules available to toggle.',
      color: 0xFFAA00
    });

    buttons = createButtonRow([
      { customId: 'sched_create', label: 'إنشاء جدول جديد', style: 'success', emoji: '📝' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  } else {
    // Toggle the first schedule as demonstration
    const scheduleToToggle = schedules[0];
    const toggledSchedule = schedulesDb.toggleSchedule(guildId, scheduleToToggle.id);

    const statusText = toggledSchedule.enabled ? '✅ مفعّل | Enabled' : '❌ معطّل | Disabled';

    embed = createEmbed({
      title: '🔘 تم التبديل | Schedule Toggled',
      description: `تم تبديل حالة الجدول الزمني بنجاح!\n\n**معرف الجدول:** \`${toggledSchedule.id}\`\n**الاسم:** ${toggledSchedule.name}\n**الحالة الجديدة:** ${statusText}`,
      color: toggledSchedule.enabled ? 0x00FF00 : 0xFF0000
    });

    buttons = createButtonRow([
      { customId: 'sched_toggle', label: 'تبديل آخر', style: 'primary', emoji: '🔘' },
      { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  }

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule toggle action by ${interaction.user.tag}`);
}

module.exports = { handle };
