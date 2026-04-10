/**
 * Admin Welcome Handler
 * إدارة الترحيب
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const settingsDb = require('../../database/settings.js');
const logger = require('../../utils/logger.js');

/**
 * Handle welcome button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guildId = interaction.guildId;
  const settings = settingsDb.getSettings(guildId);

  const welcomeStatus = settings.welcomeEnabled ? '✅ مفعّل' : '❌ معطّل';
  const welcomeChannel = settings.welcomeChannel ? `<#${settings.welcomeChannel}>` : 'غير محدد';
  const welcomeMessage = settings.welcomeMessage || 'مرحباً {user} في السيرفر!';

  const embed = createEmbed({
    title: '👋 نظام الترحيب | Welcome System',
    description: `إعدادات نظام الترحيب:\n\n**الحالة:** ${welcomeStatus}\n**قناة الترحيب:** ${welcomeChannel}`,
    color: 0x0099FF,
    fields: [
      {
        name: '💬 رسالة الترحيب',
        value: welcomeMessage,
        inline: false
      },
      {
        name: '💡 المتغيرات المتاحة',
        value: '`{user}` - ذكر العضو\n`{username}` - اسم العضو\n`{server}` - اسم السيرفر',
        inline: false
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

  logger.success(`Admin welcome viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
