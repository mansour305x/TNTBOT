import { REST, Routes } from 'discord.js';
import { commands } from '../commands/index.js';
import { setupCommand } from '../commands/setup/setup.js';
import { ScheduleService } from '../modules/schedules/service.js';
import { config } from '../config/config.js';
import { logger } from '../core/logger.js';

const scheduleService = new ScheduleService();

export async function onReady(): Promise<void> {
  const clientId = config.clientId;
  const guildId = config.guildId;

  if (!clientId) {
    logger.warn('CLIENT_ID could not be derived from token – skipping command registration.');
    logger.info('TNT 1478 Bot is ready ✓');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(config.discordToken);

  if (!guildId) {
    // Register /setup globally so the user can configure the bot from Discord
    await rest.put(Routes.applicationCommands(clientId), {
      body: [setupCommand.data.toJSON()]
    });
    logger.info('Registered /setup globally – use it in Discord to finish configuration.');
  } else {
    // Full configuration: register all commands to the guild
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map((command) => command.data.toJSON())
    });
    logger.info({ totalCommands: commands.length }, 'Commands registered to guild successfully');
  }

  // Only hydrate schedules if DB is available
  try {
    await scheduleService.hydrate();
  } catch {
    logger.warn('Schedule hydration skipped – database not available');
  }

  logger.info('TNT 1478 Bot is ready ✓  (run /setup in Discord to complete configuration)');
}
