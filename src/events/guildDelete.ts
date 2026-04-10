import type { Guild } from 'discord.js';
import { logger } from '../core/logger.js';

export async function onGuildDelete(guild: Guild): Promise<void> {
  logger.warn({ guildId: guild.id, guildName: guild.name }, 'Removed from guild');
}
