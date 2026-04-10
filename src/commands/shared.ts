import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction
} from 'discord.js';
import type { SlashCommandSubcommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export type SectionSubcommand = {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  configure?: (builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder;
};

export function createSimpleSubcommand(
  name: string,
  description: string,
  response:
    | string
    | ((interaction: ChatInputCommandInteraction) => Promise<string> | string)
): SectionSubcommand {
  return {
    name,
    description,
    execute: async (interaction) => {
      const content = typeof response === 'string' ? response : await response(interaction);
      await interaction.reply({ content, ephemeral: true });
    }
  };
}

export function createSectionCommand(
  name: string,
  description: string,
  subcommands: SectionSubcommand[]
): BotCommand {
  const data = new SlashCommandBuilder().setName(name).setDescription(description);
  for (const subcommand of subcommands) {
    data.addSubcommand((sc) => {
      sc.setName(subcommand.name).setDescription(subcommand.description);
      if (subcommand.configure) {
        return subcommand.configure(sc);
      }
      return sc;
    });
  }

  return {
    data,
    execute: async ({ interaction }) => {
      const selected = interaction.options.getSubcommand(true);
      const target = subcommands.find((s) => s.name === selected);
      if (!target) {
        await interaction.reply({
          content: `Subcommand ${selected} is not implemented.`,
          ephemeral: true
        });
        return;
      }
      await target.execute(interaction);
    }
  };
}
