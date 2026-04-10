import { AutoResponsesService } from '../../modules/management/autoresponsesService.js';
import { createSimpleSubcommand } from '../shared.js';

const autoResponsesService = new AutoResponsesService();

export const manageAutoresponses = createSimpleSubcommand('autoresponses', 'الردود التلقائية', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return autoResponsesService.overview(interaction.guildId);
});
