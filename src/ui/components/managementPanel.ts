import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildManagementPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_mgmt_roles').setLabel('Roles').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_mgmt_channels').setLabel('Channels').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_mgmt_security').setLabel('Security').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_mgmt_tickets').setLabel('Tickets').setStyle(ButtonStyle.Secondary))
  );
}
