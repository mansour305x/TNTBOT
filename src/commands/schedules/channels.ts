import type { SectionSubcommand } from '../shared.js';
import { ScheduleService } from '../../modules/schedules/service.js';

const scheduleService = new ScheduleService();

export const scheduleChannels: SectionSubcommand = {
  name: 'channels',
  description: 'إدارة قنوات الجدولة',
  configure: (subcommand) =>
    subcommand
      .addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true))
      .addStringOption((option) => option.setName('channel').setDescription('Channel ID').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    const channelId = interaction.options.getString('channel', true);
    const updated = await scheduleService.update(id, guildId, { channelId });
    await interaction.reply({ content: `Schedule channel updated: ${updated.channelId}`, ephemeral: true });
  }
};
