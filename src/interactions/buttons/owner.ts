import type { ButtonHandler } from '../../types/interaction.js';
import { config } from '../../config/config.js';
import { OwnerService } from '../../modules/owner/ownerService.js';

const ownerService = new OwnerService();

async function ensureOwner(userId: string): Promise<boolean> {
  return userId === config.ownerId;
}

export const ownerButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_owner_overview',
    execute: async (interaction) => {
      if (!(await ensureOwner(interaction.user.id))) {
        await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await ownerService.overview(), ephemeral: true });
    }
  },
  {
    customId: 'tnt_owner_system',
    execute: async (interaction) => {
      if (!(await ensureOwner(interaction.user.id))) {
        await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await ownerService.system(), ephemeral: true });
    }
  },
  {
    customId: 'tnt_owner_database',
    execute: async (interaction) => {
      if (!(await ensureOwner(interaction.user.id))) {
        await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await ownerService.databaseStats(), ephemeral: true });
    }
  },
  {
    customId: 'tnt_owner_updates',
    execute: async (interaction) => {
      if (!(await ensureOwner(interaction.user.id))) {
        await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await ownerService.updates(), ephemeral: true });
    }
  }
];
