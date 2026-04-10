import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import type { SectionSubcommand } from '../shared.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const scheduleList: SectionSubcommand = {
  name: 'list',
  description: 'عرض كل الجدولات',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const language = await settingsService.getLanguage(guildId);
    const content = await scheduleService.list(guildId, language);
    await interaction.reply({ content, ephemeral: true });
  }
};
