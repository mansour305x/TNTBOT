import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSchedulesEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('📅 Schedules | نظام الجدولة')
    .setDescription('*خفيف – واضح – بدون تعقيد*\n\nإدارة إنشاء وتعديل وتفعيل أنظمة الجدولة.')
    .addFields(
      { name: '📝 Create', value: 'إنشاء جدولة جديدة', inline: true },
      { name: '📋 List', value: 'عرض الجدولات الحالية', inline: true },
      { name: '🔘 Toggle', value: 'تشغيل / إيقاف', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center' })
    .setTimestamp();
}
