/**
 * Schedule Duplicate Handler
 * نسخ جدول زمني
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle duplicate schedule button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const schedules = schedulesDb.listSchedules(guildId);

  let embed;
  let buttons;

  if (schedules.length === 0) {
    embed = createEmbed({
      title: '📑 نسخ الجدول | Duplicate Schedule',
      description: '📭 لا توجد جداول زمنية للنسخ.\n📭 No schedules available to duplicate.',
      color: 0xFFAA00
    });

    buttons = createButtonRow([
      { customId: 'sched_create', label: 'إنشاء جدول جديد', style: 'success', emoji: '📝' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  } else {
    // Duplicate the first schedule as demonstration
    const scheduleToDuplicate = schedules[0];
    const duplicatedSchedule = schedulesDb.duplicateSchedule(guildId, scheduleToDuplicate.id);

    embed = createEmbed({
      title: '✅ تم النسخ | Schedule Duplicated',
      description: `تم نسخ الجدول الزمني بنجاح!\n\n**الجدول الأصلي:** \`${scheduleToDuplicate.id}\`\n**الجدول الجديد:** \`${duplicatedSchedule.id}\`\n**الاسم:** ${duplicatedSchedule.name}`,
      color: 0x00FF00
    });

    buttons = createButtonRow([
      { customId: 'sched_edit', label: 'تعديل النسخة', style: 'primary', emoji: '✏️' },
      { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  }

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule duplicate action by ${interaction.user.tag}`);
}

module.exports = { handle };
