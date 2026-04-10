/**
 * Schedule Edit Handler
 * تعديل جدول زمني
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const schedulesDb = require('../../database/schedules.js');
const logger = require('../../utils/logger.js');

/**
 * Handle edit schedule button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const schedules = schedulesDb.listSchedules(guildId);

  let embed;
  let buttons;

  if (schedules.length === 0) {
    embed = createEmbed({
      title: '✏️ تعديل الجدول | Edit Schedule',
      description: '📭 لا توجد جداول زمنية للتعديل.\n📭 No schedules available to edit.\n\nقم بإنشاء جدول أولاً.',
      color: 0xFFAA00
    });

    buttons = createButtonRow([
      { customId: 'sched_create', label: 'إنشاء جدول جديد', style: 'success', emoji: '📝' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  } else {
    // Show list of schedules that can be edited
    const schedulesList = schedules.slice(0, 10).map((schedule, index) => {
      const status = schedule.enabled ? '✅' : '❌';
      return `**${index + 1}.** ${status} \`${schedule.id}\`\n   📝 ${schedule.name}`;
    }).join('\n\n');

    embed = createEmbed({
      title: '✏️ تعديل الجدول | Edit Schedule',
      description: `اختر الجدول الذي تريد تعديله:\n\n${schedulesList}\n\n💡 استخدم أمر التعديل مع معرف الجدول`,
      color: 0x0099FF
    });

    buttons = createButtonRow([
      { customId: 'sched_list', label: 'عرض التفاصيل', style: 'primary', emoji: '📋' },
      { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
    ]);
  }

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule edit view opened by ${interaction.user.tag}`);
}

module.exports = { handle };
