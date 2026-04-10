import type { ModalHandler } from '../../../types/interaction.js';
import { SettingsService } from '../../../modules/settings/settingsService.js';
import { ScheduleService } from '../../../modules/schedules/service.js';

const settingsService = new SettingsService();
const scheduleService = new ScheduleService();

export const handler: ModalHandler = {
  customId: 'tnt_modal_schedule_create',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const settings = await settingsService.getOrCreate(guildId);
    const payload = interaction.fields.getTextInputValue('payload').trim();
    const created = await scheduleService.create({
      guildId,
      name: interaction.fields.getTextInputValue('name').trim(),
      cron: interaction.fields.getTextInputValue('cron').trim(),
      channelId: interaction.fields.getTextInputValue('channelId').trim(),
      actionType: interaction.fields.getTextInputValue('actionType').trim(),
      payloadAr: settings.language === 'ar' ? payload : 'تم تنفيذ جدولة جديدة.',
      payloadEn: settings.language === 'en' ? payload : 'A new schedule has been executed.',
      timezone: settings.timezone
    });

    await interaction.reply({
      content: `تم إنشاء الجدولة بنجاح. ID: ${created.id}`,
      ephemeral: true
    });
  }
};
