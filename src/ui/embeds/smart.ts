import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSmartEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('🤖 Smart | الأنظمة الذكية')
    .setDescription('*خفيفة – فعّالة – بدون ثقل*\n\nReminders, Scheduler, Security, Replies مع توسيع مستقبلي.')
    .addFields(
      { name: '⏰ Smart Reminders', value: 'تذكيرات ذكية', inline: true },
      { name: '📅 Smart Scheduler', value: 'جدولة ذكية', inline: true },
      { name: '💡 Smart Replies', value: 'ردود ذكية', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center' })
    .setTimestamp();
}
