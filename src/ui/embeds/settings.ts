import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export function buildSettingsEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.secondary)
    .setTitle('⚙️ Settings | الإعدادات')
    .setDescription('*مناسبة لبوت خفيف*\n\nتخصيص اللغة، المنطقة الزمنية، الألوان، الإشعارات، وإعدادات البوت.')
    .addFields(
      { name: '🌐 Language', value: 'اللغة', inline: true },
      { name: '🕐 Timezone', value: 'المنطقة الزمنية', inline: true },
      { name: '🔔 Notifications', value: 'الإشعارات', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center' })
    .setTimestamp();
}
