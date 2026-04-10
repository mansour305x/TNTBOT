import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import type { SectionSubcommand } from '../shared.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const scheduleDuplicate: SectionSubcommand = {
  name: 'duplicate',
  description: 'نسخ جدولة',
  configure: (subcommand) => subcommand.addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    const duplicated = await scheduleService.duplicate(id, guildId);
    const language = await settingsService.getLanguage(guildId);
    const content = language === 'ar' ? `تم نسخ الجدولة: ${duplicated.name}` : `Schedule duplicated: ${duplicated.name}`;
    await interaction.reply({ content, ephemeral: true });
  }
};
