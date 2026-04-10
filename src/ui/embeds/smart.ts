import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSmartEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('◇ Smart Systems | أنظمة الذكاء')
    .setDescription('Reminders, Scheduler, Shield, Replies مع توسيع مستقبلي.')
    .setTimestamp();
}
