import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/**
 * ⚙️ Settings | الإعدادات
 * (مناسبة لبوت خفيف)
 */
export function buildSettingsPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:settings:language')
      .setLabel('🌐 Language | اللغة')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:settings:timezone')
      .setLabel('🕐 Timezone | المنطقة الزمنية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:settings:colors')
      .setLabel('🎨 Colors | الألوان')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:settings:notifications')
      .setLabel('🔔 Notifications | الإشعارات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:settings:botsettings')
      .setLabel('🤖 Bot Settings | إعدادات البوت')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow()];
}

