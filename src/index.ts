import { client } from './core/client.js';
import { config } from './config/config.js';
import { database } from './core/database.js';
import { logger } from './core/logger.js';
import { onGuildCreate } from './events/guildCreate.js';
import { onGuildDelete } from './events/guildDelete.js';
import { onInteractionCreate } from './events/interactionCreate.js';
import { onReady } from './events/ready.js';

async function bootstrap(): Promise<void> {
  await database.connect();

  client.once('ready', () => {
    void onReady().catch((error: unknown) => {
      logger.error({ error }, 'Ready flow failed');
    });
  });

  client.on('interactionCreate', (interaction) => {
    void onInteractionCreate(interaction);
  });

  client.on('guildCreate', (guild) => {
    void onGuildCreate(guild);
  });

  client.on('guildDelete', (guild) => {
    void onGuildDelete(guild);
  });

  process.on('SIGINT', () => {
    void database.disconnect().finally(() => process.exit(0));
  });

  await client.login(config.discordToken);
  logger.info('TNT 1478 bot started');
}

void bootstrap().catch((error: unknown) => {
  logger.fatal({ error }, 'Fatal startup error');
  process.exit(1);
});
