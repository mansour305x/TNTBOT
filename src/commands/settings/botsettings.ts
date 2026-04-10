import { SettingsService } from '../../modules/settings/settingsService.js';
import { createSimpleSubcommand } from '../shared.js';

const settingsService = new SettingsService();

export const settingsBot = createSimpleSubcommand('bot', 'إعدادات البوت العامة', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  const updated = await settingsService.toggleMaintenance(interaction.guildId);
  return `Maintenance: ${updated.maintenanceMode}`;
});
