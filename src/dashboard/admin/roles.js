/**
 * Admin Roles Handler
 * إدارة الرتب
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle roles button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const guild = interaction.guild;
  
  // Get roles (excluding @everyone)
  const roles = guild.roles.cache
    .filter(role => role.name !== '@everyone')
    .sort((a, b) => b.position - a.position)
    .map(role => `${role.name} (${role.members.size} عضو)`)
    .slice(0, 15);

  const rolesList = roles.length > 0 
    ? roles.join('\n') 
    : 'لا توجد رتب';

  const embed = createEmbed({
    title: '👥 إدارة الرتب | Roles Management',
    description: `الرتب الموجودة في السيرفر:\n\n${rolesList}`,
    color: 0x0099FF,
    fields: [
      {
        name: '📊 الإحصائيات | Statistics',
        value: `**إجمالي الرتب:** ${guild.roles.cache.size - 1}`,
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

  logger.success(`Admin roles viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
