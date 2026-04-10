import type { ModalHandler } from '../../../types/interaction.js';
import { ScheduleService } from '../../../modules/schedules/service.js';

const scheduleService = new ScheduleService();

export const handler: ModalHandler = {
  customId: 'tnt_modal_schedule_edit',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const id = interaction.fields.getTextInputValue('id').trim();
    const name = interaction.fields.getTextInputValue('name').trim();
    const cron = interaction.fields.getTextInputValue('cron').trim();
    const updated = await scheduleService.update(id, guildId, {
      ...(name ? { name } : {}),
      ...(cron ? { cron } : {})
    });

    await interaction.reply({ content: `تم تحديث الجدولة: ${updated.name}`, ephemeral: true });
  }
};
