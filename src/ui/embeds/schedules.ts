import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSchedulesEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('◇ Schedules | الجدولة')
    .setDescription('إدارة إنشاء وتعديل وتفعيل أنظمة الجدولة.')
    .addFields(
      { name: 'Create', value: 'Modal لإنشاء جدولة', inline: true },
      { name: 'List', value: 'عرض الجدولات الحالية', inline: true },
      { name: 'Next Trigger', value: 'حساب أقرب تنفيذ', inline: true }
    )
    .setTimestamp();
}
