/**
 * Settings Section Index
 * قسم الإعدادات الرئيسي
 */

const { createSettingsEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

// Import sub-handlers
const languageHandler = require('./language.js');
const timezoneHandler = require('./timezone.js');
const colorsHandler = require('./colors.js');
const notificationsHandler = require('./notifications.js');
const botSettingsHandler = require('./botSettings.js');

// Route map for settings sub-sections
const settingsRoutes = {
  'set_language': languageHandler.handle,
  'set_timezone': timezoneHandler.handle,
  'set_colors': colorsHandler.handle,
  'set_notifications': notificationsHandler.handle,
  'set_botsettings': botSettingsHandler.handle
};

/**
 * Create settings section buttons
 */
function createSettingsButtons() {
  const row1 = createButtonRow([
    { customId: 'set_language', label: 'اللغة', style: 'secondary', emoji: '🌐' },
    { customId: 'set_timezone', label: 'المنطقة الزمنية', style: 'secondary', emoji: '🕐' },
    { customId: 'set_colors', label: 'الألوان', style: 'secondary', emoji: '🎨' }
  ]);

  const row2 = createButtonRow([
    { customId: 'set_notifications', label: 'الإشعارات', style: 'secondary', emoji: '🔔' },
    { customId: 'set_botsettings', label: 'إعدادات البوت', style: 'secondary', emoji: '🤖' }
  ]);

  const row3 = createButtonRow([
    { customId: 'dash_back_main', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  return [row1, row2, row3];
}

/**
 * Handle settings section main view
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createSettingsEmbed();
  const buttons = createSettingsButtons();

  await interaction.update({
    embeds: [embed],
    components: buttons
  });

  logger.success(`Settings section opened by ${interaction.user.tag}`);
}

/**
 * Route button to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  if (settingsRoutes[customId]) {
    return await settingsRoutes[customId](interaction);
  }
  
  logger.warn(`Unknown settings button: ${customId}`);
}

module.exports = {
  handle,
  routeButton,
  createSettingsButtons
};
