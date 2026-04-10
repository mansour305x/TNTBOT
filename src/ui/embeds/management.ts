import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildManagementEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('◇ Management | الإدارة')
    .setDescription('الرتب، القنوات، الصلاحيات، اللوقات، الحماية، التذاكر، الترحيب.')
    .setTimestamp();
}
