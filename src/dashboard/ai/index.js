/**
 * AI Section Index
 * قسم الذكاء الاصطناعي الرئيسي
 */

const { createAIEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

// Import sub-handlers
const smartRemindersHandler = require('./smartReminders.js');
const smartDatabaseHandler = require('./smartDatabase.js');
const smartSchedulingHandler = require('./smartScheduling.js');
const smartSecurityHandler = require('./smartSecurity.js');
const smartRepliesHandler = require('./smartReplies.js');

// Route map for AI sub-sections
const aiRoutes = {
  'ai_smartReminders': smartRemindersHandler.handle,
  'ai_smartDatabase': smartDatabaseHandler.handle,
  'ai_smartScheduling': smartSchedulingHandler.handle,
  'ai_smartSecurity': smartSecurityHandler.handle,
  'ai_smartReplies': smartRepliesHandler.handle
};

/**
 * Create AI section buttons
 */
function createAIButtons() {
  const row1 = createButtonRow([
    { customId: 'ai_smartReminders', label: 'التذكيرات الذكية', style: 'secondary', emoji: '⏰' },
    { customId: 'ai_smartDatabase', label: 'قاعدة البيانات الذكية', style: 'secondary', emoji: '🗄️' },
    { customId: 'ai_smartScheduling', label: 'الجدولة الذكية', style: 'secondary', emoji: '📅' }
  ]);

  const row2 = createButtonRow([
    { customId: 'ai_smartSecurity', label: 'الحماية الذكية', style: 'secondary', emoji: '🛡️' },
    { customId: 'ai_smartReplies', label: 'الردود الذكية', style: 'secondary', emoji: '💡' }
  ]);

  const row3 = createButtonRow([
    { customId: 'dash_back_main', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  return [row1, row2, row3];
}

/**
 * Handle AI section main view
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createAIEmbed();
  const buttons = createAIButtons();

  await interaction.update({
    embeds: [embed],
    components: buttons
  });

  logger.success(`AI section opened by ${interaction.user.tag}`);
}

/**
 * Route button to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  if (aiRoutes[customId]) {
    return await aiRoutes[customId](interaction);
  }
  
  logger.warn(`Unknown AI button: ${customId}`);
}

module.exports = {
  handle,
  routeButton,
  createAIButtons
};
