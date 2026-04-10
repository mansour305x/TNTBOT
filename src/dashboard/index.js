/**
 * Dashboard Router
 * نظام توزيع الأزرار على الأقسام
 */

const schedulesIndex = require('./schedules/index.js');
const adminIndex = require('./admin/index.js');
const settingsIndex = require('./settings/index.js');
const aiIndex = require('./ai/index.js');
const ownerIndex = require('./owner/index.js');
const logger = require('../utils/logger.js');
const { createMainDashboardEmbed } = require('../utils/embeds.js');
const { createMainDashboardButtons } = require('../utils/buttons.js');

// Route map for main sections
const mainRoutes = {
  'dash_schedules': schedulesIndex.handle,
  'dash_admin': adminIndex.handle,
  'dash_settings': settingsIndex.handle,
  'dash_ai': aiIndex.handle,
  'dash_owner': ownerIndex.handle,
  'dash_back_main': handleBackToMain
};

/**
 * Handle back to main dashboard
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handleBackToMain(interaction) {
  const embed = createMainDashboardEmbed();
  const buttons = createMainDashboardButtons();
  
  await interaction.update({
    embeds: [embed],
    components: buttons
  });
}

/**
 * Route button interaction to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  try {
    logger.logInteraction(interaction);
    
    // Check main routes first
    if (mainRoutes[customId]) {
      return await mainRoutes[customId](interaction);
    }
    
    // Route to sub-sections
    if (customId.startsWith('sched_')) {
      return await schedulesIndex.routeButton(interaction);
    }
    
    if (customId.startsWith('admin_')) {
      return await adminIndex.routeButton(interaction);
    }
    
    if (customId.startsWith('set_')) {
      return await settingsIndex.routeButton(interaction);
    }
    
    if (customId.startsWith('ai_')) {
      return await aiIndex.routeButton(interaction);
    }
    
    if (customId.startsWith('owner_')) {
      return await ownerIndex.routeButton(interaction);
    }
    
    logger.warn(`Unknown button customId: ${customId}`);
    
  } catch (error) {
    logger.error(`Error routing button ${customId}:`, error);
    
    await interaction.reply({
      content: '❌ حدث خطأ أثناء معالجة الطلب.\n❌ An error occurred while processing the request.',
      ephemeral: true
    }).catch(() => {});
  }
}

module.exports = {
  routeButton,
  handleBackToMain
};
