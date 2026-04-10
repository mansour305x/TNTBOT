import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** Complete Level-2 panel for Smart Systems section (4 subsections + nav). */
export function buildSmartPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l2:smart:reminders').setLabel('◇ Smart Reminders | تذكيرات ذكية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:smart:scheduler').setLabel('◇ Smart Scheduler | جدولة ذكية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:smart:shield').setLabel('◇ Smart Shield | حماية ذكية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:smart:replies').setLabel('◇ Smart Replies | ردود ذكية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow()];
}

