import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

export function buildDashboardActionsPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_refresh_data')
      .setLabel('🔄 Refresh Data | تحديث البيانات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_clear_cache')
      .setLabel('🗑️ Clear Cache | مسح الكاش')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_restart_bot')
      .setLabel('🔁 Restart Bot | إعادة التشغيل')
      .setStyle(ButtonStyle.Danger)
  );
}

/** Full Level-2 panel for Dashboard section. */
export function buildDashboardL2Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:dashboard:overview')
      .setLabel('👁️ Overview | نظرة عامة')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:dashboard:status')
      .setLabel('📊 System Status | حالة النظام')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:dashboard:actions')
      .setLabel('⚡ Quick Actions | إجراءات سريعة')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow()];
}

