import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildOwnerEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.primary)
    .setTitle('👑 Owner | لوحة المالك')
    .setDescription('*مخصصة لك فقط — TNT Owner*\n\nتحكم متقدم بالنظام، قاعدة البيانات، النسخ الاحتياطي، والأخطاء.')
    .addFields(
      { name: '👁️ Overview', value: 'نظرة عامة', inline: true },
      { name: '🎛️ System', value: 'التحكم بالنظام', inline: true },
      { name: '⚠️ Errors', value: 'مركز الأخطاء', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center • Owner Only' })
    .setTimestamp();
}
