import type {
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder
} from 'discord.js';

export type CommandExecuteContext = {
  interaction: ChatInputCommandInteraction;
};

export type BotCommand = {
  data: SlashCommandBuilder;
  execute: (ctx: CommandExecuteContext) => Promise<void>;
};

export type CommandJSON = RESTPostAPIChatInputApplicationCommandsJSONBody;
