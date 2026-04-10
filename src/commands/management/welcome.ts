import { WelcomeService } from '../../modules/management/welcomeService.js';
import { createSimpleSubcommand } from '../shared.js';

const welcomeService = new WelcomeService();

export const manageWelcome = createSimpleSubcommand('welcome', 'إعدادات الترحيب', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return welcomeService.overview(interaction.guild);
});
