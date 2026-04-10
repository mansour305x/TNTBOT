import { config } from '../../config/config.js';
import { OwnerService } from '../../modules/owner/ownerService.js';
import { createSimpleSubcommand } from '../shared.js';

const ownerService = new OwnerService();

export const ownerErrors = createSimpleSubcommand('errors', 'مركز الأخطاء', async (interaction) => {
  if (interaction.user.id !== config.ownerId) {
    return 'هذا القسم للمالك فقط.';
  }
  return ownerService.errors();
});
