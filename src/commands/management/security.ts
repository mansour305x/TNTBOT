import { SecurityService } from '../../modules/management/securityService.js';
import { createSimpleSubcommand } from '../shared.js';

const securityService = new SecurityService();

export const manageSecurity = createSimpleSubcommand('security', 'إعدادات الحماية', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return securityService.overview(interaction.guild);
});
