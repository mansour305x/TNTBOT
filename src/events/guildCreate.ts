import type { Guild } from 'discord.js';
import { logger } from '../core/logger.js';

export async function onGuildCreate(guild: Guild): Promise<void> {
  logger.info({ guildId: guild.id, guildName: guild.name }, 'Joined guild');
}
