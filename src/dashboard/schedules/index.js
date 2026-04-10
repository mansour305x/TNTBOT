/**
 * Schedules Section Index
 * قسم الجداول الرئيسي
 */

const { createSchedulesEmbed } = require('../../utils/embeds.js');
const { createButtonRow } = require('../../utils/buttons.js');
const logger = require('../../utils/logger.js');

// Import sub-handlers
const createHandler = require('./create.js');
const listHandler = require('./list.js');
const editHandler = require('./edit.js');
const deleteHandler = require('./delete.js');
const toggleHandler = require('./toggle.js');
const duplicateHandler = require('./duplicate.js');
const channelsHandler = require('./channels.js');

// Route map for schedule sub-sections
const scheduleRoutes = {
  'sched_create': createHandler.handle,
  'sched_list': listHandler.handle,
  'sched_edit': editHandler.handle,
  'sched_delete': deleteHandler.handle,
  'sched_toggle': toggleHandler.handle,
  'sched_duplicate': duplicateHandler.handle,
  'sched_channels': channelsHandler.handle
};

/**
 * Create schedules section buttons
 */
function createSchedulesButtons() {
  const row1 = createButtonRow([
    { customId: 'sched_create', label: 'إنشاء الجدول الزمني', style: 'primary', emoji: '📝' },
    { customId: 'sched_list', label: 'عرض الجداول', style: 'secondary', emoji: '📋' },
    { customId: 'sched_edit', label: 'تعديل الجدول', style: 'secondary', emoji: '✏️' },
    { customId: 'sched_delete', label: 'حذف الجدول', style: 'danger', emoji: '🗑️' }
  ]);

  const row2 = createButtonRow([
    { customId: 'sched_duplicate', label: 'مكررة', style: 'secondary', emoji: '📑' },
    { customId: 'sched_toggle', label: 'تمكين / تعطيل', style: 'secondary', emoji: '🔘' },
    { customId: 'sched_channels', label: 'القنوات', style: 'secondary', emoji: '📢' }
  ]);

  const row3 = createButtonRow([
    { customId: 'dash_back_main', label: 'رجوع | Back', style: 'secondary', emoji: '◀️' }
  ]);

  return [row1, row2, row3];
}

/**
 * Handle schedules section main view
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function handle(interaction) {
  const embed = createSchedulesEmbed();
  const buttons = createSchedulesButtons();

  await interaction.update({
    embeds: [embed],
    components: buttons
  });

  logger.success(`Schedules section opened by ${interaction.user.tag}`);
}

/**
 * Route button to appropriate handler
 * @param {ButtonInteraction} interaction - Button interaction
 */
async function routeButton(interaction) {
  const customId = interaction.customId;
  
  if (scheduleRoutes[customId]) {
    return await scheduleRoutes[customId](interaction);
  }
  
  // Handle back to schedules
  if (customId === 'sched_back') {
    return await handle(interaction);
  }
  
  logger.warn(`Unknown schedule button: ${customId}`);
}

module.exports = {
  handle,
  routeButton,
  createSchedulesButtons
};
