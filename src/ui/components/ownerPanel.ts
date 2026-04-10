import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildOwnerPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_owner_overview').setLabel('Overview').setStyle(ButtonStyle.Primary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_owner_system').setLabel('System').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_owner_database').setLabel('Database').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_owner_updates').setLabel('Updates').setStyle(ButtonStyle.Secondary))
  );
}
