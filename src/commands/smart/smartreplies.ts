import { SmartRepliesService } from '../../modules/smart/smartRepliesService.js';
import { createSimpleSubcommand } from '../shared.js';

const smartRepliesService = new SmartRepliesService();

export const smartReplies = createSimpleSubcommand('replies', 'الردود الذكية', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return smartRepliesService.overview(interaction.guildId);
});
