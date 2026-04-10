/**
 * Logger utility for TNT Dashboard
 * تسجيل الأخطاء والأحداث
 */

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function getTimestamp() {
  return new Date().toISOString();
}

function info(message, ...args) {
  console.log(`${colors.cyan}[INFO]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
}

function success(message, ...args) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
}

function warn(message, ...args) {
  console.log(`${colors.yellow}[WARN]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
}

function error(message, ...args) {
  console.error(`${colors.red}[ERROR]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
}

function debug(message, ...args) {
  console.log(`${colors.magenta}[DEBUG]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
}

function logInteraction(interaction) {
  const user = interaction.user?.tag || 'Unknown';
  const guild = interaction.guild?.name || 'DM';
  const type = interaction.isButton() ? 'Button' : interaction.isCommand() ? 'Command' : 'Other';
  const id = interaction.customId || interaction.commandName || 'Unknown';
  
  info(`[${type}] ${user} in ${guild}: ${id}`);
}

module.exports = {
  info,
  success,
  warn,
  error,
  debug,
  logInteraction
};
