import type { ModalHandler } from '../../../types/interaction.js';
import { SettingsService } from '../../../modules/settings/settingsService.js';

const settingsService = new SettingsService();

export const handler: ModalHandler = {
  customId: 'tnt_modal_language',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const raw = interaction.fields.getTextInputValue('language').trim().toLowerCase();
    if (raw !== 'ar' && raw !== 'en') {
      await interaction.reply({ content: 'القيمة المسموحة هي ar أو en فقط.', ephemeral: true });
      return;
    }

    await settingsService.updateLanguage(guildId, raw);
    await interaction.reply({ content: raw === 'ar' ? 'تم تحديث اللغة بنجاح.' : 'Language updated successfully.', ephemeral: true });
  }
};
