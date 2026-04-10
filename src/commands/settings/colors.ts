import type { SectionSubcommand } from '../shared.js';
import { SettingsService } from '../../modules/settings/settingsService.js';

const settingsService = new SettingsService();

export const settingsColors: SectionSubcommand = {
  name: 'colors',
  description: 'تخصيص الألوان',
  configure: (subcommand) =>
    subcommand
      .addStringOption((option) => option.setName('primary').setDescription('Primary hex color').setRequired(true))
      .addStringOption((option) => option.setName('secondary').setDescription('Secondary hex color').setRequired(true)),
  execute: async (interaction) => {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
      return;
    }
    const primary = interaction.options.getString('primary', true);
    const secondary = interaction.options.getString('secondary', true);
    const updated = await settingsService.updateColors(guildId, primary, secondary);
    await interaction.reply({ content: `Colors updated: ${updated.primaryColor} / ${updated.secondaryColor}`, ephemeral: true });
  }
};
