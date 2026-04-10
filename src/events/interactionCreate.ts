import type { Interaction } from 'discord.js';
import { replyWithError } from '../app/errorHandler.js';
import { t } from '../app/i18n.js';
import { commands } from '../commands/index.js';
import { logger } from '../core/logger.js';
import { buttonHandlers, modalHandlers, selectMenuHandlers } from '../interactions/index.js';
import { SettingsService } from '../modules/settings/settingsService.js';

const settingsService = new SettingsService();

export async function onInteractionCreate(interaction: Interaction): Promise<void> {
  try {
    if (interaction.isChatInputCommand()) {
      const command = commands.find((c) => c.data.name === interaction.commandName);
      if (!command) {
        let language: 'ar' | 'en' = 'ar';
        try { if (interaction.guildId) language = await settingsService.getLanguage(interaction.guildId); } catch { /* db unavailable */ }
        await interaction.reply({ content: t(language, 'unknownCommand'), ephemeral: true });
        return;
      }
      await command.execute({ interaction });
      return;
    }

    if (interaction.isButton()) {
      const handler = buttonHandlers.find((h) =>
        h.prefix ? interaction.customId.startsWith(h.customId) : h.customId === interaction.customId
      );
      if (handler) {
        await handler.execute(interaction);
      }
      return;
    }

    if (interaction.isStringSelectMenu()) {
      const handler = selectMenuHandlers.find((h) => h.customId === interaction.customId);
      if (handler) {
        await handler.execute(interaction);
      }
      return;
    }

    if (interaction.isModalSubmit()) {
      const handler = modalHandlers.find((h) => h.customId === interaction.customId);
      if (handler) {
        await handler.execute(interaction);
      }
      return;
    }
  } catch (error: unknown) {
    logger.error({ error }, 'Interaction processing failed');
    if (interaction.isRepliable()) {
      let language: 'ar' | 'en' = 'ar';
      try { if (interaction.guildId) language = await settingsService.getLanguage(interaction.guildId); } catch { /* db unavailable */ }
      await replyWithError(interaction, language, error);
    }
  }
}
