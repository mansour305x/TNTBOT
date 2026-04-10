import type { ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';

export type ButtonHandler = {
  customId: string;
  /** When true, match by `customId.startsWith()` instead of strict equality. */
  prefix?: boolean;
  execute: (interaction: ButtonInteraction) => Promise<void>;
};

export type ModalHandler = {
  customId: string;
  execute: (interaction: ModalSubmitInteraction) => Promise<void>;
};

export type SelectMenuHandler = {
  customId: string;
  execute: (interaction: StringSelectMenuInteraction) => Promise<void>;
};
