import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSettingsEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('◇ Settings | الإعدادات')
    .setDescription('تخصيص اللغة، المنطقة الزمنية، الألوان، الإشعارات، وإعدادات البوت.')
    .setTimestamp();
}
