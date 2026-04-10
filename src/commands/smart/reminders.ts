import { SmartRemindersService } from '../../modules/smart/smartRemindersService.js';
import { createSimpleSubcommand } from '../shared.js';

const smartRemindersService = new SmartRemindersService();

export const smartReminders = createSimpleSubcommand('reminders', 'التذكيرات الذكية', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return smartRemindersService.overview(interaction.guildId);
});
