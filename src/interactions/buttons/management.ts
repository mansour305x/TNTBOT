import type { ButtonHandler } from '../../types/interaction.js';
import { ChannelsService } from '../../modules/management/channelsService.js';
import { RolesService } from '../../modules/management/rolesService.js';
import { SecurityService } from '../../modules/management/securityService.js';
import { TicketsService } from '../../modules/management/ticketsService.js';

const rolesService = new RolesService();
const channelsService = new ChannelsService();
const securityService = new SecurityService();
const ticketsService = new TicketsService();

export const managementButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_mgmt_roles',
    execute: async (interaction) => {
      if (!interaction.guild) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await rolesService.overview(interaction.guild), ephemeral: true });
    }
  },
  {
    customId: 'tnt_mgmt_channels',
    execute: async (interaction) => {
      if (!interaction.guild) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await channelsService.overview(interaction.guild), ephemeral: true });
    }
  },
  {
    customId: 'tnt_mgmt_security',
    execute: async (interaction) => {
      if (!interaction.guild) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await securityService.overview(interaction.guild), ephemeral: true });
    }
  },
  {
    customId: 'tnt_mgmt_tickets',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await ticketsService.overview(interaction.guildId), ephemeral: true });
    }
  }
];
