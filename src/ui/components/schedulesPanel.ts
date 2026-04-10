import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildSchedulesPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_sched_create').setLabel('Create').setStyle(ButtonStyle.Primary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_sched_list').setLabel('List').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_sched_toggle').setLabel('Toggle').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_sched_next').setLabel('Next').setStyle(ButtonStyle.Secondary))
  );
}
