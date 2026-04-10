import { PermissionsService } from '../../modules/management/permissionsService.js';
import { createSimpleSubcommand } from '../shared.js';

const permissionsService = new PermissionsService();

export const managePermissions = createSimpleSubcommand('permissions', 'إدارة الصلاحيات', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return permissionsService.overview(interaction.guild);
});
