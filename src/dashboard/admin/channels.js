/**
 * Admin Channels Handler
 * إدارة القنوات
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle channels button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guild = interaction.guild;
  
  // Count channels by type
  const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
  const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
  const categories = guild.channels.cache.filter(c => c.type === 4).size;

  const embed = createEmbed({
    title: '📢 إدارة القنوات | Channels Management',
    description: 'نظرة عامة على قنوات السيرفر.',
    color: 0x0099FF,
    fields: [
      {
        name: '💬 القنوات النصية',
        value: `${textChannels} قناة`,
        inline: true
      },
      {
        name: '🔊 القنوات الصوتية',
        value: `${voiceChannels} قناة`,
        inline: true
      },
      {
        name: '📁 الفئات',
        value: `${categories} فئة`,
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

  logger.success(`Admin channels viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
