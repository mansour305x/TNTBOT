import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

/**
 * Builds the navigation row that appears at the bottom of every L2 / L3 panel.
 * @param backSection  The section key to return to (e.g. 'schedules'). Omit for L2 panels.
 */
export function buildNavRow(backSection?: string): ActionRowBuilder<ButtonBuilder> {
  const row = new ActionRowBuilder<ButtonBuilder>();

  if (backSection) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`tnt_nav:back:${backSection}`)
        .setLabel('← رجوع | Back')
        .setStyle(ButtonStyle.Secondary)
    );
  }

  row.addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_nav:home')
      .setLabel('🏠 الرئيسية | Home')
      .setStyle(ButtonStyle.Secondary)
  );

  return row;
}
