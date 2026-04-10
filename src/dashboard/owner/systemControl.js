/**
 * Owner System Control Handler
 * التحكم بالنظام
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle system control button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const maintenanceStatus = settings.maintenanceMode ? '✅ مفعّل' : '❌ معطّل';
  const notificationsStatus = settings.notificationsEnabled ? '✅ مفعّلة' : '❌ معطّلة';

  const embed = createEmbed({
    title: '🎛️ التحكم بالنظام | System Control',
    description: 'تحكم كامل في جميع أنظمة البوت.',
    color: 0xD4AF37,
    fields: [
      {
        name: '🔧 وضع الصيانة',
        value: maintenanceStatus,
        inline: true
      },
      {
        name: '🔔 الإشعارات',
        value: notificationsStatus,
        inline: true
      },
      {
        name: '⚡ الإجراءات المتاحة',
        value: '• إعادة تشغيل البوت\n• تفعيل/تعطيل الأنظمة\n• مسح الذاكرة المؤقتة',
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

  logger.success(`Owner system control viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
