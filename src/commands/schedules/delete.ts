import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import type { SectionSubcommand } from '../shared.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const scheduleDelete: SectionSubcommand = {
  name: 'delete',
  description: 'حذف جدولة',
  configure: (subcommand) => subcommand.addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    await scheduleService.delete(id, guildId);
    const language = await settingsService.getLanguage(guildId);
    await interaction.reply({ content: language === 'ar' ? 'تم حذف الجدولة.' : 'Schedule deleted.', ephemeral: true });
  }
};
