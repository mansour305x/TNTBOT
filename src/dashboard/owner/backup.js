/**
 * Owner Backup Handler
 * النسخ الاحتياطي
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle backup button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createEmbed({
    title: '💾 النسخ الاحتياطي | Backup',
    description: 'إدارة النسخ الاحتياطية لقاعدة البيانات.',
    color: 0xD4AF37,
    fields: [
      {
        name: '📋 النسخ الاحتياطية',
        value: 'لا توجد نسخ احتياطية حالياً.',
        inline: false
      },
      {
        name: '⚡ الإجراءات المتاحة',
        value: '• إنشاء نسخة احتياطية\n• استعادة نسخة احتياطية\n• حذف نسخة احتياطية',
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

  logger.success(`Owner backup viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
