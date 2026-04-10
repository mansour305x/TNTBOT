import type { ButtonBuilder } from 'discord.js';
import { config } from '../../config/config.js';

/**
 * Applies the TNT 1478 logo emoji to a button ONLY when TNT_EMOJI_ID is set in .env.
 * Without a configured custom emoji ID, returns the button unchanged (text-only, no error).
 * This prevents Discord API rejection from invalid emoji characters.
 */
export function withTntEmoji(button: ButtonBuilder): ButtonBuilder {
  if (config.tntEmojiId) {
    return button.setEmoji({ id: config.tntEmojiId });
  }
  return button;
}
