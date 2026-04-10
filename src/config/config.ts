import { env } from './env.js';
import { runtimeConfig } from './setupConfig.js';

export const config = {
  discordToken: env.DISCORD_TOKEN,
  get clientId(): string { return runtimeConfig.clientId; },
  get guildId(): string { return runtimeConfig.guildId; },
  get databaseUrl(): string { return runtimeConfig.databaseUrl; },
  databaseProvider: 'postgres' as const,
  nodeEnv: env.NODE_ENV,
  get ownerId(): string { return runtimeConfig.ownerId; },
  defaultLanguage: env.DEFAULT_LANGUAGE,
  defaultTimezone: env.DEFAULT_TIMEZONE,
  logLevel: env.LOG_LEVEL,
  tntEmojiId: env.TNT_EMOJI_ID
};
