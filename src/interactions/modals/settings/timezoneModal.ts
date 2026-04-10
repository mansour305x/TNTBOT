import type { ModalHandler } from '../../../types/interaction.js';
import { SettingsService } from '../../../modules/settings/settingsService.js';

const settingsService = new SettingsService();

export const handler: ModalHandler = {
  customId: 'tnt_modal_timezone',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const timezone = interaction.fields.getTextInputValue('timezone').trim();
    await settingsService.updateTimezone(guildId, timezone);
    const language = await settingsService.getLanguage(guildId);
    await interaction.reply({
      content: language === 'ar' ? 'تم تحديث المنطقة الزمنية بنجاح.' : 'Timezone updated successfully.',
      ephemeral: true
    });
  }
};
