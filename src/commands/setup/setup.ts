import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { BotCommand } from '../../types/command.js';
import { buildSetupEmbed, buildSetupPanel } from '../../ui/components/setupPanel.js';

export const setupCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('إعداد البوت — Configure bot credentials') as SlashCommandBuilder,

  execute: async ({ interaction }: { interaction: ChatInputCommandInteraction }) => {
    const embed = buildSetupEmbed();
    const rows = buildSetupPanel();

    await interaction.reply({
      embeds: [embed],
      components: rows,
      ephemeral: true
    });
  }
};
