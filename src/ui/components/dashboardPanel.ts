import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildDashboardActionsPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_refresh_data').setLabel('Refresh Data').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_clear_cache').setLabel('Clear Cache').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_restart_bot').setLabel('Restart Bot').setStyle(ButtonStyle.Danger))
  );
}
