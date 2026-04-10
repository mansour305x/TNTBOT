import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import type { SectionSubcommand } from '../shared.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const scheduleNext: SectionSubcommand = {
  name: 'next',
  description: 'عرض أقرب تنفيذ',
  configure: (subcommand) => subcommand.addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    const next = await scheduleService.getNextTrigger(id, guildId);
    const language = await settingsService.getLanguage(guildId);
    const content = next
      ? language === 'ar'
        ? `أقرب تنفيذ: ${next.toISOString()}`
        : `Next execution: ${next.toISOString()}`
      : language === 'ar'
        ? 'لا يوجد تنفيذ قادم.'
        : 'No next execution.';
    await interaction.reply({ content, ephemeral: true });
  }
};
