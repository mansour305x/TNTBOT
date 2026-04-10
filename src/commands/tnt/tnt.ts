import { SlashCommandBuilder } from 'discord.js';
import { database } from '../../app/database.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import type { BotCommand } from '../../types/command.js';
import { buildDashboardL2Panel } from '../../ui/components/dashboardPanel.js';
import { buildMainPanel, buildMainPanelOwner } from '../../ui/components/mainPanel.js';
import { buildDashboardEmbed } from '../../ui/embeds/dashboard.js';

const settingsService = new SettingsService();

export const tntCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('tnt')
    .setDescription('فتح لوحة التحكم الرئيسية للبوت TNT 1478'),
  execute: async ({ interaction }) => {
    const guildId = interaction.guildId;
    const isDbUp = database.getHealth() === 'connected';
    const settings = (guildId && isDbUp) ? await settingsService.getOrCreate(guildId).catch(() => null) : null;
    const schedulesCount = (guildId && isDbUp)
      ? await database.client.schedule.count({ where: { guildId } }).catch(() => 0)
      : 0;

    await interaction.reply({
      embeds: [
        buildDashboardEmbed({
          guildName: interaction.guild?.name ?? 'Unknown',
          databaseHealth: database.getHealth(),
          uptimeSeconds: Math.floor(process.uptime()),
          schedulesCount,
          notificationsEnabled: settings?.notificationsEnabled ?? false,
          maintenanceMode: settings?.maintenanceMode ?? false
        })
      ],
      components: [buildMainPanel(), buildMainPanelOwner(), ...buildDashboardL2Panel()],
      ephemeral: true
    });
  }
};

