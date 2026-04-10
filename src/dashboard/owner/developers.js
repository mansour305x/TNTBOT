/**
 * Owner Developers Handler
 * إدارة المطورين
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle developers button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createEmbed({
    title: '👨‍💻 المطورين | Developers',
    description: 'إدارة صلاحيات المطورين.',
    color: 0xD4AF37,
    fields: [
      {
        name: '👑 المالك',
        value: `<@${interaction.user.id}>`,
        inline: true
      },
      {
        name: '👨‍💻 المطورين',
        value: 'لا يوجد مطورين مضافين.',
        inline: true
      },
      {
        name: '⚡ الإجراءات المتاحة',
        value: '• إضافة مطور\n• إزالة مطور\n• تعديل الصلاحيات',
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

  logger.success(`Owner developers viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
