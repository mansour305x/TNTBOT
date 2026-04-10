import { TicketsService } from '../../modules/management/ticketsService.js';
import { createSimpleSubcommand } from '../shared.js';

const ticketsService = new TicketsService();

export const manageTickets = createSimpleSubcommand('tickets', 'إدارة التذاكر', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return ticketsService.overview(interaction.guildId);
});
