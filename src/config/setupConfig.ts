import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';

// -----------------------------------------------------------
// Derive CLIENT_ID automatically from Discord bot token.
// A Discord token is: base64(clientId) . timestamp . hmac
// -----------------------------------------------------------
function deriveClientId(token: string): string {
  try {
    const first = token.split('.')[0] ?? '';
    const decoded = Buffer.from(first, 'base64').toString('utf8');
    // Must be a valid snowflake (all digits)
    if (/^\d{17,20}$/.test(decoded)) return decoded;
  } catch {
    // ignore
  }
  return '';
}

// -----------------------------------------------------------
// Runtime config with sensible defaults.
// Values come from env first; CLIENT_ID is auto-derived if missing.
// -----------------------------------------------------------
export const runtimeConfig = {
  get clientId(): string {
    return process.env.CLIENT_ID || deriveClientId(env.DISCORD_TOKEN);
  },
  get guildId(): string {
    return process.env.GUILD_ID ?? '';
  },
  get databaseUrl(): string {
    return process.env.DATABASE_URL ?? '';
  },
  get ownerId(): string {
    return process.env.OWNER_ID ?? '';
  },
  get isFullyConfigured(): boolean {
    return !!(
      this.clientId &&
      this.guildId &&
      this.databaseUrl &&
      this.ownerId
    );
  },
  get missingKeys(): string[] {
    const missing: string[] = [];
    if (!this.clientId) missing.push('CLIENT_ID');
    if (!this.guildId) missing.push('GUILD_ID');
    if (!this.databaseUrl) missing.push('DATABASE_URL');
    if (!this.ownerId) missing.push('OWNER_ID');
    return missing;
  }
};

// -----------------------------------------------------------
// Write a key=value pair into the .env file permanently
// (works with tsx watch — it sees the file change and restarts)
// -----------------------------------------------------------
const ENV_PATH = path.resolve(process.cwd(), '.env');

export function persistEnvKey(key: string, value: string): void {
  let content = '';
  if (fs.existsSync(ENV_PATH)) {
    content = fs.readFileSync(ENV_PATH, 'utf8');
  }

  const escaped = value.replace(/\\/g, '\\\\');
  const line = `${key}=${escaped}`;
  const regex = new RegExp(`^${key}=.*$`, 'm');

  if (regex.test(content)) {
    content = content.replace(regex, line);
  } else {
    content = content.trimEnd() + '\n' + line + '\n';
  }

  fs.writeFileSync(ENV_PATH, content, 'utf8');
  // Also update the live process.env so commands work without restart
  process.env[key] = value;
}
