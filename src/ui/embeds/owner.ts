import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildOwnerEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.primary)
    .setTitle('◇ Owner Panel | لوحة المالك')
    .setDescription('تحكم متقدم بالنظام، قاعدة البيانات، النسخ الاحتياطي، والأخطاء.')
    .setTimestamp();
}
