import { EmbedBuilder } from 'discord.js';
import { embedTheme } from './theme.js';

export type DashboardMetrics = {
  guildName: string;
  databaseHealth: string;
  uptimeSeconds: number;
  schedulesCount: number;
  notificationsEnabled: boolean;
  maintenanceMode: boolean;
};

export function buildDashboardEmbed(metrics: DashboardMetrics): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(embedTheme.primary)
    .setTitle('🎛️ TNT Control Panel | لوحة التحكم')
    .setDescription('*مختصرة – قوية – فخمة مثل الشعار*\n\nلوحة التحكم الرئيسية - نظرة سريعة على الأنظمة')
    .addFields(
      { name: '🏠 Server', value: metrics.guildName, inline: true },
      { name: '🗄️ DB', value: metrics.databaseHealth, inline: true },
      { name: '⏱️ Uptime', value: `${metrics.uptimeSeconds}s`, inline: true },
      { name: '📅 Schedules', value: String(metrics.schedulesCount), inline: true },
      { name: '🔔 Notifications', value: metrics.notificationsEnabled ? '✅' : '❌', inline: true },
      { name: '🔧 Maintenance', value: metrics.maintenanceMode ? '✅' : '❌', inline: true }
    )
    .setFooter({ text: '👑 TNT 1478 Control Center' })
    .setTimestamp();
}
