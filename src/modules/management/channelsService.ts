import type { Guild } from 'discord.js';

export class ChannelsService {
  public async overview(guild: Guild): Promise<string> {
    const channels = await guild.channels.fetch();
    const visible = Array.from(channels.values()).filter((channel) => channel !== null);
    const summary = visible.slice(0, 10).map((channel) => `${channel.name} (${channel.type})`);
    return [`Total Channels: ${visible.length}`, ...summary].join('\n');
  }
}
