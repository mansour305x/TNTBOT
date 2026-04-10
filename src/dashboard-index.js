/**
 * TNT Dashboard Bot - Main Entry Point
 * ملف التشغيل الرئيسي للبوت
 * 
 * @description بوت ديسكورد احترافي مع لوحة تحكم متكاملة
 * @version 1.0.0
 */

const { Client, GatewayIntentBits, REST, Routes, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Load config
const config = require('./dashboard-config.json');
const logger = require('./utils/logger.js');
const dashboardRouter = require('./dashboard/index.js');

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// Store commands in collection
client.commands = new Collection();

/**
 * Load commands from /commands directory
 */
function loadCommands() {
  const commandsPath = path.join(__dirname, 'commands');
  
  if (!fs.existsSync(commandsPath)) {
    logger.warn('Commands directory does not exist');
    return [];
  }

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  const commands = [];

  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
        logger.success(`Loaded command: ${command.data.name}`);
      } else {
        logger.warn(`Command ${file} is missing required "data" or "execute" property`);
      }
    } catch (error) {
      logger.error(`Error loading command ${file}:`, error);
    }
  }

  return commands;
}

/**
 * Register slash commands with Discord API
 */
async function registerCommands(commands) {
  const rest = new REST().setToken(config.token);

  try {
    logger.info(`Registering ${commands.length} slash commands...`);

    // Register commands for specific guild (faster during development)
    if (config.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commands }
      );
      logger.success(`Successfully registered ${commands.length} guild commands`);
    } else {
      // Register global commands
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands }
      );
      logger.success(`Successfully registered ${commands.length} global commands`);
    }
  } catch (error) {
    logger.error('Error registering commands:', error);
  }
}

/**
 * Handle interaction create event
 */
client.on('interactionCreate', async (interaction) => {
  try {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        logger.warn(`Unknown command: ${interaction.commandName}`);
        return;
      }

      await command.execute(interaction);
      return;
    }

    // Handle button interactions
    if (interaction.isButton()) {
      logger.logInteraction(interaction);
      await dashboardRouter.routeButton(interaction);
      return;
    }

    // Handle select menu interactions
    if (interaction.isStringSelectMenu()) {
      logger.logInteraction(interaction);
      // Add select menu handling here if needed
      return;
    }

    // Handle modal submissions
    if (interaction.isModalSubmit()) {
      logger.logInteraction(interaction);
      // Add modal handling here if needed
      return;
    }

  } catch (error) {
    logger.error('Error handling interaction:', error);

    // Try to respond with error message
    const errorMessage = '❌ حدث خطأ أثناء معالجة الطلب.\n❌ An error occurred while processing the request.';
    
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    } catch (e) {
      logger.error('Could not send error response:', e);
    }
  }
});

/**
 * Handle client ready event
 */
client.once('ready', () => {
  logger.success(`✅ Bot is ready! Logged in as ${client.user.tag}`);
  logger.info(`📊 Serving ${client.guilds.cache.size} guild(s)`);
  
  // Set bot status
  client.user.setPresence({
    activities: [{ name: '/dashboard | TNT Control Panel', type: 3 }],
    status: 'online'
  });
});

/**
 * Handle errors
 */
client.on('error', (error) => {
  logger.error('Client error:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
});

/**
 * Main function to start the bot
 */
async function main() {
  try {
    logger.info('🚀 Starting TNT Dashboard Bot...');

    // Load and register commands
    const commands = loadCommands();
    await registerCommands(commands);

    // Login to Discord
    await client.login(config.token);

  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
main();

module.exports = { client };
