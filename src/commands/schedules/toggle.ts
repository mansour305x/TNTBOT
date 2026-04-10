import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import type { SectionSubcommand } from '../shared.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const scheduleToggle: SectionSubcommand = {
  name: 'toggle',
  description: 'تفعيل أو تعطيل جدولة',
  configure: (subcommand) => subcommand.addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    const schedule = await scheduleService.toggle(id, guildId);
    const language = await settingsService.getLanguage(guildId);
    const content = language === 'ar' ? `تم تحديث الحالة: ${schedule.name}` : `Updated status: ${schedule.name}`;
    await interaction.reply({ content, ephemeral: true });
  }
};
