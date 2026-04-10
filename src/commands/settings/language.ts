import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import type { SectionSubcommand } from '../shared.js';

export const settingsLanguage: SectionSubcommand = {
  name: 'language',
  description: 'تغيير اللغة',
  execute: async (interaction) => {
    const modal = new ModalBuilder().setCustomId('tnt_modal_language').setTitle('Language');
    const input = new TextInputBuilder().setCustomId('language').setLabel('Language: ar or en').setStyle(TextInputStyle.Short).setRequired(true).setMaxLength(2);
    modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));
    await interaction.showModal(modal);
  }
};
