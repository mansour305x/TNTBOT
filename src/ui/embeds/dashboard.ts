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
    .setTitle('◇ TNT 1478 | Dashboard')
    .setDescription('لوحة التحكم الرئيسية - نظرة سريعة على الأنظمة')
    .addFields(
      { name: 'Server', value: metrics.guildName, inline: true },
      { name: 'DB', value: metrics.databaseHealth, inline: true },
      { name: 'Uptime', value: `${metrics.uptimeSeconds}s`, inline: true },
      { name: 'Schedules', value: String(metrics.schedulesCount), inline: true },
      { name: 'Notifications', value: String(metrics.notificationsEnabled), inline: true },
      { name: 'Maintenance', value: String(metrics.maintenanceMode), inline: true }
    )
    .setFooter({ text: 'TNT 1478 Control Center' })
    .setTimestamp();
}
