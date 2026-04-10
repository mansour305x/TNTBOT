import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildManagementEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('🛠️ Management | إدارة السيرفر')
    .setDescription('*مختصر + احترافي*\n\nالرتب، القنوات، الصلاحيات، اللوجات، الحماية، التذاكر، الترحيب.')
    .addFields(
      { name: '👥 Roles', value: 'إدارة الرتب', inline: true },
      { name: '📢 Channels', value: 'إدارة القنوات', inline: true },
      { name: '🛡️ Security', value: 'إعدادات الحماية', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center' })
    .setTimestamp();
}
