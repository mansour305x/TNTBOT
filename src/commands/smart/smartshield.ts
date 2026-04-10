import { SmartShieldService } from '../../modules/smart/smartShieldService.js';
import { createSimpleSubcommand } from '../shared.js';

const smartShieldService = new SmartShieldService();

export const smartShield = createSimpleSubcommand('shield', 'الدرع الذكي', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return smartShieldService.overview(interaction.guild);
});
