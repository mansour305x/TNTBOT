import { SettingsService } from '../../modules/settings/settingsService.js';
import { createSimpleSubcommand } from '../shared.js';

const settingsService = new SettingsService();

export const settingsNotifications = createSimpleSubcommand('notifications', 'إعدادات الإشعارات', async (interaction) => {
  if (!interaction.guildId) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  const updated = await settingsService.toggleNotifications(interaction.guildId);
  return `Notifications: ${updated.notificationsEnabled}`;
});
