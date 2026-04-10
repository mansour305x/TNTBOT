import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Settings > Language */
export function buildSettingsLanguageL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:settings:language:arabic').setLabel('Switch to Arabic | التحويل للعربية').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:language:english').setLabel('Switch to English | التحويل للإنجليزية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:language:auto').setLabel('Auto Detect | كشف اللغة تلقائياً').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('settings')];
}

/** L3 buttons for Settings > Timezone */
export function buildSettingsTimezoneL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:settings:timezone:set').setLabel('Set Timezone | ضبط المنطقة الزمنية').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:timezone:sync').setLabel('Sync with Server | مزامنة مع السيرفر').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:timezone:show').setLabel('Show Current | عرض المنطقة الحالية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('settings')];
}

/** L3 buttons for Settings > Colors */
export function buildSettingsColorsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:settings:colors:primary').setLabel('Primary Color | اللون الأساسي').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:colors:accent').setLabel('Accent Color | لون التمييز').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:colors:reset').setLabel('Reset Theme | إعادة تعيين الثيم').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('settings')];
}

/** L3 buttons for Settings > Notifications */
export function buildSettingsNotificationsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:settings:notifications:dmon').setLabel('Enable DM Notifs | تفعيل إشعارات الخاص').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:settings:notifications:dmoff').setLabel('Disable DM Notifs | إيقاف إشعارات الخاص').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:settings:notifications:channel').setLabel('Channel Notifs | إشعارات القنوات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:notifications:errors').setLabel('Error Notifs | إشعارات الأخطاء').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('settings')];
}

/** L3 buttons for Settings > Bot Settings */
export function buildSettingsBotL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:settings:botsettings:prefix').setLabel('Set Prefix | تعيين البريفكس').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:botsettings:toggle').setLabel('Toggle Systems | تشغيل/إيقاف الأنظمة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:settings:botsettings:maintenance').setLabel('Maintenance Mode | وضع الصيانة').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:settings:botsettings:reset').setLabel('Reset Config | إعادة ضبط الإعدادات').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('settings')];
}
