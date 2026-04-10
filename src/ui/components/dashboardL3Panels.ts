import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Dashboard > Overview */
export function buildDashboardOverviewL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:overview:summary').setLabel('View Summary | عرض الملخص').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:overview:systems').setLabel('Active Systems | الأنظمة النشطة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:overview:activity').setLabel('Recent Activity | آخر النشاطات').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('dashboard')];
}

/** L3 buttons for Dashboard > System Status */
export function buildDashboardStatusL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:status:online').setLabel('Bot Online Status | حالة اتصال البوت').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:status:api').setLabel('API Status | حالة الـ API').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:status:errors').setLabel('Error Summary | ملخص الأخطاء').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('dashboard')];
}

/** L3 buttons for Dashboard > Quick Actions */
export function buildDashboardActionsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:actions:restart').setLabel('Restart Bot | إعادة تشغيل البوت').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:actions:cache').setLabel('Clear Cache | مسح الذاكرة المؤقتة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:dashboard:actions:refresh').setLabel('Refresh Data | تحديث البيانات').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('dashboard')];
}
