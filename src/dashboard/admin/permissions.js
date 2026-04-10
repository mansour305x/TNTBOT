/**
 * Admin Permissions Handler
 * إدارة الصلاحيات
 */

const { createEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

/**
 * Handle permissions button
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const member = interaction.member;
  
  // Get member permissions
  const permissions = member.permissions.toArray();
  const importantPerms = [
    'Administrator',
    'ManageGuild',
    'ManageRoles',
    'ManageChannels',
    'KickMembers',
    'BanMembers',
    'ManageMessages'
  ];

  const userPerms = importantPerms.map(perm => {
    const hasPerm = permissions.includes(perm);
    return `${hasPerm ? '✅' : '❌'} ${perm}`;
  }).join('\n');

  const embed = createEmbed({
    title: '🔐 إدارة الصلاحيات | Permissions Management',
    description: `صلاحياتك في هذا السيرفر:\n\n${userPerms}`,
    color: 0x0099FF
  });

  const buttons = createButtonRow([
    { customId: 'dash_admin', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  await interaction.update({
    embeds: [embed],
    components: [buttons]
  });

  logger.success(`Admin permissions viewed by ${interaction.user.tag}`);
}

module.exports = { handle };
