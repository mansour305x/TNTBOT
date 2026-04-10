import type { ButtonHandler } from '../../types/interaction.js';
import { SmartRemindersService } from '../../modules/smart/smartRemindersService.js';
import { SmartRepliesService } from '../../modules/smart/smartRepliesService.js';
import { SmartSchedulerService } from '../../modules/smart/smartSchedulerService.js';
import { SmartShieldService } from '../../modules/smart/smartShieldService.js';

const smartRemindersService = new SmartRemindersService();
const smartSchedulerService = new SmartSchedulerService();
const smartShieldService = new SmartShieldService();
const smartRepliesService = new SmartRepliesService();

export const smartButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_smart_reminders',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await smartRemindersService.overview(interaction.guildId), ephemeral: true });
    }
  },
  {
    customId: 'tnt_smart_scheduler',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await smartSchedulerService.overview(interaction.guildId), ephemeral: true });
    }
  },
  {
    customId: 'tnt_smart_shield',
    execute: async (interaction) => {
      if (!interaction.guild) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await smartShieldService.overview(interaction.guild), ephemeral: true });
    }
  },
  {
    customId: 'tnt_smart_replies',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: await smartRepliesService.overview(interaction.guildId), ephemeral: true });
    }
  }
];
