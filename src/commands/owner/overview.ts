import { config } from '../../config/config.js';
import { OwnerService } from '../../modules/owner/ownerService.js';
import { createSimpleSubcommand } from '../shared.js';

const ownerService = new OwnerService();

export const ownerOverview = createSimpleSubcommand('overview', 'نظرة عامة للمالك', async (interaction) => {
  if (interaction.user.id !== config.ownerId) {
    return 'هذا القسم للمالك فقط.';
  }
  return ownerService.overview();
});
