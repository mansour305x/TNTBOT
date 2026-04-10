/**
 * Admin Section Index
 * قسم الإدارة الرئيسي
 */

const { createAdminEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

// Import sub-handlers
const rolesHandler = require('./roles.js');
const channelsHandler = require('./channels.js');
const permissionsHandler = require('./permissions.js');
const logsHandler = require('./logs.js');
const securityHandler = require('./security.js');
const ticketsHandler = require('./tickets.js');
const autoresponsesHandler = require('./autoresponses.js');
const welcomeHandler = require('./welcome.js');

// Route map for admin sub-sections
const adminRoutes = {
  'admin_roles': rolesHandler.handle,
  'admin_channels': channelsHandler.handle,
  'admin_permissions': permissionsHandler.handle,
  'admin_logs': logsHandler.handle,
  'admin_security': securityHandler.handle,
  'admin_tickets': ticketsHandler.handle,
  'admin_autoresponses': autoresponsesHandler.handle,
  'admin_welcome': welcomeHandler.handle
};

/**
 * Create admin section buttons
 */
function createAdminButtons() {
  const row1 = createButtonRow([
    { customId: 'admin_roles', label: 'الرتب', style: 'secondary', emoji: '👥' },
    { customId: 'admin_channels', label: 'القنوات', style: 'secondary', emoji: '📢' },
    { customId: 'admin_permissions', label: 'الصلاحيات', style: 'secondary', emoji: '🔐' },
    { customId: 'admin_logs', label: 'السجلات', style: 'secondary', emoji: '📝' }
  ]);

  const row2 = createButtonRow([
    { customId: 'admin_security', label: 'الحماية', style: 'secondary', emoji: '🛡️' },
    { customId: 'admin_tickets', label: 'التذاكر', style: 'secondary', emoji: '🎫' },
    { customId: 'admin_autoresponses', label: 'الردود التلقائية', style: 'secondary', emoji: '💬' },
    { customId: 'admin_welcome', label: 'الترحيب', style: 'secondary', emoji: '👋' }
  ]);

  const row3 = createButtonRow([
    { customId: 'dash_back_main', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  return [row1, row2, row3];
}

/**
 * Handle admin section main view
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createAdminEmbed();
  const buttons = createAdminButtons();

  await interaction.update({
    embeds: [embed],
    components: buttons
  });

  logger.success(`Admin section opened by ${interaction.user.tag}`);
}

/**
 * Route button to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  if (adminRoutes[customId]) {
    return await adminRoutes[customId](interaction);
  }
  
  logger.warn(`Unknown admin button: ${customId}`);
}

module.exports = {
  handle,
  routeButton,
  createAdminButtons
};
