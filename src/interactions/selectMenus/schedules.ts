import type { SelectMenuHandler } from '../../types/interaction.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';

const settingsService = new SettingsService();
const scheduleService = new ScheduleService();

export const scheduleSelectHandlers: SelectMenuHandler[] = [
  {
    customId: 'tnt_sched_toggle_select',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }

      const id = interaction.values[0];
      if (!id) {
        await interaction.reply({ content: 'Invalid schedule selection.', ephemeral: true });
        return;
      }
      const updated = await scheduleService.toggle(id, interaction.guildId);
      const language = await settingsService.getLanguage(interaction.guildId);
      await interaction.reply({
        content: language === 'ar' ? `تم تحديث الحالة: ${updated.name}` : `Updated status: ${updated.name}`,
        ephemeral: true
      });
    }
  },
  {
    customId: 'tnt_sched_next_select',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }

      const id = interaction.values[0];
      if (!id) {
        await interaction.reply({ content: 'Invalid schedule selection.', ephemeral: true });
        return;
      }
      const next = await scheduleService.getNextTrigger(id, interaction.guildId);
      const language = await settingsService.getLanguage(interaction.guildId);
      await interaction.reply({
        content: next
          ? language === 'ar'
            ? `أقرب تنفيذ: ${next.toISOString()}`
            : `Next execution: ${next.toISOString()}`
          : language === 'ar'
            ? 'لا يوجد تنفيذ قادم.'
            : 'No next execution.',
        ephemeral: true
      });
    }
  }
];
