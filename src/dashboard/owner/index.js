/**
 * Owner Section Index
 * قسم المالك الرئيسي
 */

const { createOwnerEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

// Import sub-handlers
const overviewHandler = require('./overview.js');
const systemControlHandler = require('./systemControl.js');
const backupHandler = require('./backup.js');
const developersHandler = require('./developers.js');
const masterLogsHandler = require('./masterLogs.js');
const errorCenterHandler = require('./errorCenter.js');
const updatesHandler = require('./updates.js');

// Route map for owner sub-sections
const ownerRoutes = {
  'owner_overview': overviewHandler.handle,
  'owner_systemControl': systemControlHandler.handle,
  'owner_backup': backupHandler.handle,
  'owner_developers': developersHandler.handle,
  'owner_masterLogs': masterLogsHandler.handle,
  'owner_errorCenter': errorCenterHandler.handle,
  'owner_updates': updatesHandler.handle
};

/**
 * Create owner section buttons
 */
function createOwnerButtons() {
  const row1 = createButtonRow([
    { customId: 'owner_overview', label: 'نظرة عامة', style: 'primary', emoji: '👁️' },
    { customId: 'owner_systemControl', label: 'التحكم بالنظام', style: 'secondary', emoji: '🎛️' },
    { customId: 'owner_backup', label: 'النسخ الاحتياطي', style: 'secondary', emoji: '💾' }
  ]);

  const row2 = createButtonRow([
    { customId: 'owner_developers', label: 'المطورين', style: 'secondary', emoji: '👨‍💻' },
    { customId: 'owner_masterLogs', label: 'السجلات المتقدمة', style: 'secondary', emoji: '📊' },
    { customId: 'owner_errorCenter', label: 'مركز الأخطاء', style: 'secondary', emoji: '⚠️' }
  ]);

  const row3 = createButtonRow([
    { customId: 'owner_updates', label: 'التحديثات', style: 'secondary', emoji: '🔄' },
    { customId: 'dash_back_main', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  return [row1, row2, row3];
}

/**
 * Handle owner section main view
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  // Check if user is owner (this would check against config.ownerId)
  // For now, we allow access but log a warning
  logger.info(`Owner section accessed by ${interaction.user.tag} (${interaction.user.id})`);

  const embed = createOwnerEmbed();
  const buttons = createOwnerButtons();

  await interaction.update({
    embeds: [embed],
    components: buttons
  });

  logger.success(`Owner section opened by ${interaction.user.tag}`);
}

/**
 * Route button to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  if (ownerRoutes[customId]) {
    return await ownerRoutes[customId](interaction);
  }
  
  logger.warn(`Unknown owner button: ${customId}`);
}

module.exports = {
  handle,
  routeButton,
  createOwnerButtons
};
