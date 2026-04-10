import type { ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';

export type ButtonHandler = {
  customId: string;
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
