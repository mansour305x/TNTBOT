/**
 * Admin Security Handler
 * إدارة الحماية
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle security button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guild = interaction.guild;
  
  // Security info
  const verificationLevel = {
    0: 'لا شيء',
    1: 'منخفض',
    2: 'متوسط',
    3: 'عالي',
    4: 'أعلى'
  };

  const embed = createEmbed({
    title: '🛡️ إدارة الحماية | Security Management',
    description: 'إعدادات حماية السيرفر.',
    color: 0x0099FF,
    fields: [
      {
        name: '🔒 مستوى التحقق',
        value: verificationLevel[guild.verificationLevel] || 'غير معروف',
        inline: true
      },
      {
        name: '🤖 مرشح المحتوى',
        value: guild.explicitContentFilter === 0 ? 'معطّل' : 'مفعّل',
        inline: true
      },
      {
        name: '📲 المصادقة الثنائية',
        value: guild.mfaLevel === 1 ? 'مطلوبة' : 'غير مطلوبة',
        inline: true
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'dash_admin', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Admin security viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
