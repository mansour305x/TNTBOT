import type { SectionSubcommand } from '../shared.js';
import { ScheduleService } from '../../modules/schedules/service.js';

const scheduleService = new ScheduleService();

export const scheduleEdit: SectionSubcommand = {
  name: 'edit',
  description: 'تعديل جدولة',
  configure: (subcommand) =>
    subcommand
      .addStringOption((option) => option.setName('id').setDescription('Schedule ID').setRequired(true))
      .addStringOption((option) => option.setName('name').setDescription('New name').setRequired(false))
      .addStringOption((option) => option.setName('cron').setDescription('New cron').setRequired(false))
      .addStringOption((option) => option.setName('payload').setDescription('New message').setRequired(false)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.options.getString('id', true);
    const name = interaction.options.getString('name');
    const cron = interaction.options.getString('cron');
    const payload = interaction.options.getString('payload');
    const updated = await scheduleService.update(id, guildId, {
      ...(name ? { name } : {}),
      ...(cron ? { cron } : {}),
      ...(payload ? { payloadAr: payload, payloadEn: payload } : {})
    });

    await interaction.reply({ content: `Updated schedule: ${updated.name}`, ephemeral: true });
  }
};
