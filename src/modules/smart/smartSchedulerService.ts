import { database } from '../../app/database.js';

export class SmartSchedulerService {
  public async overview(guildId: string): Promise<string> {
    const total = await database.client.schedule.count({ where: { guildId } });
    const enabled = await database.client.schedule.count({ where: { guildId, enabled: true } });
    return `Schedules: ${enabled}/${total} enabled. Recommendation: consolidate overlapping hourly jobs.`;
  }
}
