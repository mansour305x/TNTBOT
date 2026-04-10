import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/**
 * 🛠️ Management | إدارة السيرفر
 * (مختصر + احترافي)
 */
export function buildManagementPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:roles')
      .setLabel('👥 Roles | الرتب')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:channels')
      .setLabel('📢 Channels | القنوات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:permissions')
      .setLabel('🔐 Permissions | الصلاحيات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:logs')
      .setLabel('📝 Logs | اللوجات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:security')
      .setLabel('🛡️ Security | الحماية')
      .setStyle(ButtonStyle.Secondary)
  );
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:tickets')
      .setLabel('🎫 Tickets | التذاكر')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:autoresponses')
      .setLabel('💬 Auto Responses | الردود التلقائية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:management:welcome')
      .setLabel('👋 Welcome | الترحيب')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row1, row2, buildNavRow()];
}

