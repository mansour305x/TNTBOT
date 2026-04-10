import { ChannelsService } from '../../modules/management/channelsService.js';
import { createSimpleSubcommand } from '../shared.js';

const channelsService = new ChannelsService();

export const manageChannels = createSimpleSubcommand('channels', 'إدارة القنوات', async (interaction) => {
  if (!interaction.guild) {
    return 'هذا الإجراء يعمل داخل السيرفر فقط.';
  }
  return channelsService.overview(interaction.guild);
});
