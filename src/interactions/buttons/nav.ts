import type { ButtonInteraction } from 'discord.js';
import { database } from '../../app/database.js';
import { config } from '../../config/config.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import type { ButtonHandler } from '../../types/interaction.js';
import { buildMainPanel, buildMainPanelOwner } from '../../ui/components/mainPanel.js';
import { buildDashboardL2Panel } from '../../ui/components/dashboardPanel.js';
import { buildSchedulesPanel } from '../../ui/components/schedulesPanel.js';
import { buildManagementPanel } from '../../ui/components/managementPanel.js';
import { buildSettingsPanel } from '../../ui/components/settingsPanel.js';
import { buildSmartPanel } from '../../ui/components/smartPanel.js';
import { buildOwnerPanel } from '../../ui/components/ownerPanel.js';
import { buildDashboardEmbed } from '../../ui/embeds/dashboard.js';
import { buildSchedulesEmbed } from '../../ui/embeds/schedules.js';
import { buildManagementEmbed } from '../../ui/embeds/management.js';
import { buildSettingsEmbed } from '../../ui/embeds/settings.js';
import { buildSmartEmbed } from '../../ui/embeds/smart.js';
import { buildOwnerEmbed } from '../../ui/embeds/owner.js';

const settingsService = new SettingsService();

async function handleHome(interaction: ButtonInteraction): Promise<void> {
  const baseRows = [buildMainPanel(), buildMainPanelOwner()];
  const guildId = interaction.guildId;
  const isDbUp = database.getHealth() === 'connected';
  const settings = (guildId && isDbUp) ? await settingsService.getOrCreate(guildId).catch(() => null) : null;
  const schedulesCount = (guildId && isDbUp)
    ? await database.client.schedule.count({ where: { guildId } }).catch(() => 0)
    : 0;

  await interaction.update({
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
    components: [...baseRows, ...buildDashboardL2Panel()]
  });
}

async function handleBack(interaction: ButtonInteraction): Promise<void> {
  // customId format: tnt_nav:back:{section}
  const section = interaction.customId.split(':')[2] ?? '';
  const baseRows = [buildMainPanel(), buildMainPanelOwner()];

  switch (section) {
    case 'dashboard':
      await interaction.update({
        embeds: [buildDashboardEmbed({
          guildName: interaction.guild?.name ?? 'Unknown',
          databaseHealth: database.getHealth(),
          uptimeSeconds: Math.floor(process.uptime()),
          schedulesCount: 0,
          notificationsEnabled: false,
          maintenanceMode: false
        })],
        components: [...baseRows, ...buildDashboardL2Panel()]
      });
      break;

    case 'schedules':
      await interaction.update({
        embeds: [buildSchedulesEmbed()],
        components: [...baseRows, ...buildSchedulesPanel()]
      });
      break;

    case 'management':
      await interaction.update({
        embeds: [buildManagementEmbed()],
        components: [...baseRows, ...buildManagementPanel()]
      });
      break;

    case 'settings':
      await interaction.update({
        embeds: [buildSettingsEmbed()],
        components: [...baseRows, ...buildSettingsPanel()]
      });
      break;

    case 'smart':
      await interaction.update({
        embeds: [buildSmartEmbed()],
        components: [...baseRows, ...buildSmartPanel()]
      });
      break;

    case 'owner':
      if (interaction.user.id !== config.ownerId) {
        await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.update({
        embeds: [buildOwnerEmbed()],
        components: [...baseRows, ...buildOwnerPanel()]
      });
      break;

    default:
      await handleHome(interaction);
  }
}

export const navButtonHandlers: ButtonHandler[] = [
  { customId: 'tnt_nav:home', execute: handleHome },
  { customId: 'tnt_nav:back:', prefix: true, execute: handleBack }
];
