import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import type { SectionSubcommand } from '../shared.js';

export const settingsTimezone: SectionSubcommand = {
  name: 'timezone',
  description: 'تغيير المنطقة الزمنية',
  execute: async (interaction) => {
    const modal = new ModalBuilder().setCustomId('tnt_modal_timezone').setTitle('Timezone');
    const input = new TextInputBuilder().setCustomId('timezone').setLabel('Timezone').setPlaceholder('Asia/Riyadh').setStyle(TextInputStyle.Short).setRequired(true);
    modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));
    await interaction.showModal(modal);
  }
};
