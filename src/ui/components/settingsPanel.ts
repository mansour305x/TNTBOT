import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildSettingsPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_set_language').setLabel('Language').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_set_timezone').setLabel('Timezone').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_set_colors').setLabel('Colors').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_set_notifications').setLabel('Notifications').setStyle(ButtonStyle.Secondary))
  );
}
