import { RolesService } from '../../modules/management/rolesService.js';
import { createSimpleSubcommand } from '../shared.js';

const rolesService = new RolesService();

export const manageRoles = createSimpleSubcommand('roles', 'إدارة الرتب', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return rolesService.overview(interaction.guild);
});
