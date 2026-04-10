import type { RepliableInteraction } from 'discord.js';
import { database } from './database.js';
import { logger } from './logger.js';
import { t } from './i18n.js';

export async function replyWithError(
  interaction: RepliableInteraction,
  language: 'ar' | 'en',
  error: unknown
): Promise<void> {
  logger.error({ error }, 'Interaction failed');

  try {
    if (database.getHealth() === 'connected') {
      await database.client.errorEntry.create({
        data: {
          scope: 'interaction',
          message: error instanceof Error ? error.message : String(error),
          metadata: {
            interactionType: interaction.type,
            userId: interaction.user.id,
            guildId: interaction.guildId ?? null
          }
        }
      });
    }
  } catch (storageError: unknown) {
    logger.warn({ storageError }, 'Failed to persist error entry');
  }

  const message = t(language, 'unexpectedError');

  if (interaction.deferred || interaction.replied) {
    await interaction.followUp({ content: message, ephemeral: true });
    return;
  }

  await interaction.reply({ content: message, ephemeral: true });
}
