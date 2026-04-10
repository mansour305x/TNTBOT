import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/**
 * 🤖 Smart | الأنظمة الذكية
 * (خفيفة – فعّالة – بدون ثقل)
 */
export function buildSmartPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:smart:reminders')
      .setLabel('⏰ Smart Reminders | تذكيرات ذكية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:smart:scheduler')
      .setLabel('📅 Smart Scheduler | جدولة ذكية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:smart:shield')
      .setLabel('🛡️ Smart Security | حماية ذكية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:smart:replies')
      .setLabel('💡 Smart Replies | ردود ذكية')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow()];
}

