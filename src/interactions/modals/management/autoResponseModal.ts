import type { ModalHandler } from '../../../types/interaction.js';
import { AutoResponsesService } from '../../../modules/management/autoresponsesService.js';
import { SettingsService } from '../../../modules/settings/settingsService.js';

const autoResponsesService = new AutoResponsesService();
const settingsService = new SettingsService();

export const handler: ModalHandler = {
  customId: 'tnt_modal_autoresponse',
  execute: async (interaction) => {
    if (!interaction.guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const settings = await settingsService.getOrCreate(interaction.guildId);
    const keyword = interaction.fields.getTextInputValue('keyword').trim();
    const response = interaction.fields.getTextInputValue('response').trim();
    const id = await autoResponsesService.create(
      interaction.guildId,
      keyword,
      settings.language === 'ar' ? response : 'رد تلقائي جديد.',
      settings.language === 'en' ? response : 'New auto response.'
    );
    await interaction.reply({ content: `Auto response created: ${id}`, ephemeral: true });
  }
};
