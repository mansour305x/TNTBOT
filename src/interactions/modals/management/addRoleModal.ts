import type { ModalHandler } from '../../../types/interaction.js';

export const handler: ModalHandler = {
  customId: 'tnt_modal_add_role',
  execute: async (interaction) => {
    if (!interaction.guild) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }

    const name = interaction.fields.getTextInputValue('name').trim();
    const role = await interaction.guild.roles.create({ name });
    await interaction.reply({ content: `تم إنشاء الرتبة: ${role.name}`, ephemeral: true });
  }
};
