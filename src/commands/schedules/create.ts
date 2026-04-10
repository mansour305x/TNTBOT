import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import type { SectionSubcommand } from '../shared.js';

const settingsService = new SettingsService();

export const scheduleCreate: SectionSubcommand = {
  name: 'create',
  description: 'إنشاء جدولة جديدة',
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const settings = await settingsService.getOrCreate(guildId);
    const modal = new ModalBuilder().setCustomId('tnt_modal_schedule_create').setTitle('Create Schedule');
    const nameInput = new TextInputBuilder().setCustomId('name').setLabel('Name').setStyle(TextInputStyle.Short).setRequired(true);
    const cronInput = new TextInputBuilder().setCustomId('cron').setLabel('Cron').setPlaceholder('*/30 * * * *').setStyle(TextInputStyle.Short).setRequired(true);
    const channelInput = new TextInputBuilder().setCustomId('channelId').setLabel('Channel ID').setStyle(TextInputStyle.Short).setRequired(true);
    const actionInput = new TextInputBuilder().setCustomId('actionType').setLabel('Action Type').setStyle(TextInputStyle.Short).setValue('notification').setRequired(true);
    const payloadInput = new TextInputBuilder().setCustomId('payload').setLabel(`Message (${settings.language.toUpperCase()})`).setStyle(TextInputStyle.Paragraph).setRequired(true);

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(cronInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(channelInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(actionInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(payloadInput)
    );

    await interaction.showModal(modal);
  }
};
