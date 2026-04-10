import { SmartSchedulerService } from '../../modules/smart/smartSchedulerService.js';
import { createSimpleSubcommand } from '../shared.js';

const smartSchedulerService = new SmartSchedulerService();

export const smartScheduler = createSimpleSubcommand('scheduler', 'الجدولة الذكية', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return smartSchedulerService.overview(interaction.guildId);
});
