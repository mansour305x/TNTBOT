/**
 * Owner Updates Handler
 * التحديثات
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle updates button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const currentVersion = '1.0.0';

  const embed = createEmbed({
    title: '🔄 التحديثات | Updates',
    description: 'معلومات عن إصدار البوت والتحديثات.',
    color: 0xD4AF37,
    fields: [
      {
        name: '📦 الإصدار الحالي',
        value: `v${currentVersion}`,
        inline: true
      },
      {
        name: '✅ الحالة',
        value: 'محدّث',
        inline: true
      },
      {
        name: '📋 آخر التحديثات',
        value: '• إصدار أولي للبوت\n• إضافة لوحة التحكم\n• إضافة نظام الجدولة',
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

  logger.success(`Owner updates viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
