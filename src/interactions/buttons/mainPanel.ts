import type { ButtonInteraction } from 'discord.js';
import { database } from '../../app/database.js';
import { scheduler } from '../../core/scheduler.js';
import { config } from '../../config/config.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import type { ButtonHandler } from '../../types/interaction.js';
import { buildDashboardL2Panel } from '../../ui/components/dashboardPanel.js';
import { buildMainPanel, buildMainPanelOwner } from '../../ui/components/mainPanel.js';
import { buildManagementPanel } from '../../ui/components/managementPanel.js';
import { buildOwnerPanel } from '../../ui/components/ownerPanel.js';
import { buildSchedulesPanel } from '../../ui/components/schedulesPanel.js';
import { buildSettingsPanel } from '../../ui/components/settingsPanel.js';
import { buildSmartPanel } from '../../ui/components/smartPanel.js';
import { buildSetupEmbed, buildSetupPanel } from '../../ui/components/setupPanel.js';
import { buildDashboardEmbed } from '../../ui/embeds/dashboard.js';
import { buildManagementEmbed } from '../../ui/embeds/management.js';
import { buildOwnerEmbed } from '../../ui/embeds/owner.js';
import { buildSchedulesEmbed } from '../../ui/embeds/schedules.js';
import { buildSettingsEmbed } from '../../ui/embeds/settings.js';
import { buildSmartEmbed } from '../../ui/embeds/smart.js';

const settingsService = new SettingsService();
const scheduleService = new ScheduleService();

async function updateDashboard(interaction: ButtonInteraction): Promise<void> {
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

async function updateToSection(interaction: ButtonInteraction): Promise<void> {
  const baseRows = [buildMainPanel(), buildMainPanelOwner()];

  if (interaction.customId === 'tnt_dashboard') {
    await updateDashboard(interaction);
    return;
  }

  if (interaction.customId === 'tnt_schedules') {
    await interaction.update({ embeds: [buildSchedulesEmbed()], components: [...baseRows, ...buildSchedulesPanel()] });
    return;
  }

  if (interaction.customId === 'tnt_management') {
    await interaction.update({
      embeds: [buildManagementEmbed()],
      components: [...baseRows, ...buildManagementPanel()]
    });
    return;
  }

  if (interaction.customId === 'tnt_settings') {
    await interaction.update({ embeds: [buildSettingsEmbed()], components: [...baseRows, ...buildSettingsPanel()] });
    return;
  }

  if (interaction.customId === 'tnt_smart') {
    await interaction.update({ embeds: [buildSmartEmbed()], components: [...baseRows, ...buildSmartPanel()] });
    return;
  }

  if (interaction.customId === 'tnt_owner') {
    if (interaction.user.id !== config.ownerId) {
      await interaction.reply({ content: 'هذه اللوحة للمالك فقط.', ephemeral: true });
      return;
    }

    await interaction.update({ embeds: [buildOwnerEmbed()], components: [...baseRows, ...buildOwnerPanel()] });
    return;
  }

  if (interaction.customId === 'tnt_refresh_data') {
    await updateDashboard(interaction);
    return;
  }

  if (interaction.customId === 'tnt_clear_cache') {
    scheduler.clear();
    await scheduleService.hydrate();
    await interaction.reply({ content: '✅ تم إعادة تحميل الجدولات بنجاح. | Scheduler cache reloaded.', ephemeral: true });
    return;
  }

  if (interaction.customId === 'tnt_setup_open') {
    await interaction.reply({
      embeds: [buildSetupEmbed()],
      components: buildSetupPanel(),
      ephemeral: true
    });
    return;
  }

  if (interaction.customId === 'tnt_restart_bot') {
    if (interaction.user.id !== config.ownerId) {
      await interaction.reply({ content: 'هذه العملية للمالك فقط.', ephemeral: true });
      return;
    }

    await interaction.reply({ content: '🔄 جارٍ إعادة التشغيل... | Restart signal accepted.', ephemeral: true });
    process.exit(0);
  }
}

export const mainPanelButtonHandlers: ButtonHandler[] = [
  { customId: 'tnt_dashboard', execute: updateToSection },
  { customId: 'tnt_schedules', execute: updateToSection },
  { customId: 'tnt_management', execute: updateToSection },
  { customId: 'tnt_settings', execute: updateToSection },
  { customId: 'tnt_smart', execute: updateToSection },
  { customId: 'tnt_owner', execute: updateToSection },
  { customId: 'tnt_refresh_data', execute: updateToSection },
  { customId: 'tnt_clear_cache', execute: updateToSection },
  { customId: 'tnt_restart_bot', execute: updateToSection },
  { customId: 'tnt_setup_open', execute: updateToSection }
];

