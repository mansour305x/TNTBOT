import dotenv from 'dotenv';
import { z } from 'zod';
import { DEFAULT_TIMEZONE } from './constants.js';

dotenv.config();

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(1),
  // optional – derived from token or set via /setup
  CLIENT_ID: z.string().default(''),
  GUILD_ID: z.string().default(''),
  DATABASE_URL: z.string().default(''),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  OWNER_ID: z.string().default(''),
  DEFAULT_LANGUAGE: z.enum(['ar', 'en']).default('ar'),
  DEFAULT_TIMEZONE: z.string().min(1).default(DEFAULT_TIMEZONE),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  TNT_EMOJI_ID: z.string().optional()
});

export const env = envSchema.parse(process.env);
