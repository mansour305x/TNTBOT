import { SlashCommandBuilder } from 'discord.js';
import { database } from '../../app/database.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import type { BotCommand } from '../../types/command.js';
import { buildDashboardActionsPanel } from '../../ui/components/dashboardPanel.js';
import { buildMainPanel, buildMainPanelOwner } from '../../ui/components/mainPanel.js';
import { buildDashboardEmbed } from '../../ui/embeds/dashboard.js';

const settingsService = new SettingsService();

export const tntCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('tnt')
    .setDescription('فتح لوحة التحكم الرئيسية للبوت TNT 1478'),
  execute: async ({ interaction }) => {
    const guildId = interaction.guildId;
    const settings = guildId ? await settingsService.getOrCreate(guildId) : null;
    const schedulesCount = guildId ? await database.client.schedule.count({ where: { guildId } }) : 0;

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
      components: [buildMainPanel(), buildMainPanelOwner(), buildDashboardActionsPanel()],
      ephemeral: true
    });
  }
};
