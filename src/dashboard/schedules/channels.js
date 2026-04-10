/**
 * Schedule Channels Handler
 * إدارة قنوات الجدولة
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle schedule channels button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guild = interaction.guild;
  
  // Get text channels
  const textChannels = guild.channels.cache
    .filter(channel => channel.type === 0) // GuildText
    .map(channel => `#${channel.name}`)
    .slice(0, 10);

  const channelsList = textChannels.length > 0 
    ? textChannels.join('\n') 
    : 'لا توجد قنوات نصية';

  const embed = createEmbed({
    title: '📢 قنوات الجدولة | Schedule Channels',
    description: `القنوات المتاحة للجدولة:\n\n${channelsList}\n\n💡 اختر قناة لربطها بالجدول الزمني`,
    color: 0x0099FF,
    fields: [
      {
        name: '📊 الإحصائيات | Statistics',
        value: `**إجمالي القنوات:** ${textChannels.length}`,
        inline: true
      }
    ]
  });

  const buttons = createButtonRow([
    { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
    { customId: 'dash_schedules', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Schedule channels viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
