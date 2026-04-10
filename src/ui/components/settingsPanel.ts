import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** Complete Level-2 panel for Settings section (5 subsections + nav). */
export function buildSettingsPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l2:settings:language').setLabel('◇ Language | اللغة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:settings:timezone').setLabel('◇ Timezone | المنطقة الزمنية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:settings:colors').setLabel('◇ Colors | الألوان').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:settings:notifications').setLabel('◇ Notifications | الإشعارات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l2:settings:botsettings').setLabel('◇ Bot Settings | إعدادات البوت').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow()];
}

