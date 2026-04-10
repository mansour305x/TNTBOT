/**
 * Button utilities for TNT Dashboard
 * دوال إنشاء أزرار موحدة
 */

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

/**
 * Create a single button
 * @param {string} customId - Button custom ID
 * @param {string} label - Button label
 * @param {string} style - Button style (primary, secondary, success, danger)
 * @param {string} emoji - Optional emoji
 * @param {boolean} disabled - Whether button is disabled
 */
function createButton(customId, label, style = 'primary', emoji = null, disabled = false) {
  const styleMap = {
    primary: ButtonStyle.Primary,
    secondary: ButtonStyle.Secondary,
    success: ButtonStyle.Success,
    danger: ButtonStyle.Danger
  };

  const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel(label)
    .setStyle(styleMap[style] || ButtonStyle.Primary)
    .setDisabled(disabled);

  if (emoji) {
    button.setEmoji(emoji);
  }

  return button;
}

/**
 * Create an action row with buttons
 * @param {Array} buttons - Array of button configs
 */
function createButtonRow(buttons) {
  const row = new ActionRowBuilder();
  
  for (const btn of buttons) {
    row.addComponents(
      createButton(btn.customId, btn.label, btn.style, btn.emoji, btn.disabled)
    );
  }
  
  return row;
}

/**
 * Create multiple action rows
 * @param {Array<Array>} buttonGroups - Array of button groups (max 5 buttons per row)
 */
function createButtonRows(buttonGroups) {
  return buttonGroups.map(group => createButtonRow(group));
}

/**
 * Create a back button
 * @param {string} customId - Custom ID to return to
 */
function createBackButton(customId) {
  return createButton(customId, 'رجوع | Back', 'secondary', '◀️');
}

/**
 * Create main dashboard buttons
 */
function createMainDashboardButtons() {
  const row1 = createButtonRow([
    { customId: 'dash_schedules', label: 'الجداول | Schedules', style: 'primary', emoji: '📅' },
    { customId: 'dash_admin', label: 'الإدارة | Admin', style: 'primary', emoji: '🛠️' },
    { customId: 'dash_settings', label: 'الإعدادات | Settings', style: 'primary', emoji: '⚙️' }
  ]);

  const row2 = createButtonRow([
    { customId: 'dash_ai', label: 'ذكي | AI', style: 'primary', emoji: '🤖' },
    { customId: 'dash_owner', label: 'مالك | Owner', style: 'danger', emoji: '👑' }
  ]);

  return [row1, row2];
}

module.exports = {
  createButton,
  createButtonRow,
  createButtonRows,
  createBackButton,
  createMainDashboardButtons
};
