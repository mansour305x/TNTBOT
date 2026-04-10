import { config } from '../../config/config.js';
import { OwnerService } from '../../modules/owner/ownerService.js';
import { createSimpleSubcommand } from '../shared.js';

const ownerService = new OwnerService();

export const ownerDatabase = createSimpleSubcommand('database', 'إدارة قاعدة البيانات', async (interaction) => {
  if (interaction.user.id !== config.ownerId) {
    return 'هذا القسم للمالك فقط.';
  }
  return ownerService.databaseStats();
});
