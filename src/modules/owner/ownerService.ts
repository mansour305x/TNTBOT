import { database } from '../../app/database.js';
import { config } from '../../config/config.js';

export class OwnerService {
  public async overview(): Promise<string> {
    const developers = await database.client.developer.count();
    const errors = await database.client.errorEntry.count();
    return [
      `Owner ID: ${config.ownerId}`,
      `DB Health: ${database.getHealth()}`,
      `Uptime: ${Math.floor(process.uptime())}s`,
      `Memory RSS: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      `Developers: ${developers}`,
      `Error Entries: ${errors}`
    ].join('\n');
  }

  public async system(): Promise<string> {
    return [
      `PID: ${process.pid}`,
      `Node: ${process.version}`,
      `Platform: ${process.platform}`,
      `Uptime: ${Math.floor(process.uptime())}s`,
      `Memory RSS: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`
    ].join('\n');
  }

  public async databaseStats(): Promise<string> {
    const [guilds, schedules, tickets, autoResponses, errors] = await Promise.all([
      database.client.guildConfig.count(),
      database.client.schedule.count(),
      database.client.ticket.count(),
      database.client.autoResponse.count(),
      database.client.errorEntry.count()
    ]);

    return [
      `Guilds: ${guilds}`,
      `Schedules: ${schedules}`,
      `Tickets: ${tickets}`,
      `Auto Responses: ${autoResponses}`,
      `Errors: ${errors}`
    ].join('\n');
  }

  public async backup(): Promise<string> {
    const timestamp = new Date().toISOString();
    const stats = await this.databaseStats();
    return `Backup snapshot ${timestamp}\n${stats}`;
  }

  public async integrations(): Promise<string> {
    return 'Integrations registry: Discord REST active, Prisma active, node-schedule active.';
  }

  public async logs(): Promise<string> {
    return this.errors();
  }

  public async updates(): Promise<string> {
    return 'Current runtime stack: discord.js v14, Prisma, Zod, pino, node-schedule.';
  }

  public async errors(): Promise<string> {
    const items = await database.client.errorEntry.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
    if (items.length === 0) {
      return 'No recorded errors.';
    }
    return items.map((item) => `${item.scope}: ${item.message}`).join('\n');
  }

  public async developers(): Promise<string> {
    const items = await database.client.developer.findMany({ orderBy: { addedAt: 'desc' } });
    if (items.length === 0) {
      return 'No developers configured.';
    }
    return items.map((item) => item.userId).join('\n');
  }
}
