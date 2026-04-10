import { database } from '../../app/database.js';

export class SmartRemindersService {
  public async overview(guildId: string): Promise<string> {
    const schedules = await database.client.schedule.count({ where: { guildId, enabled: true } });
    return `Active reminders baseline: ${schedules}. Suggestion: keep 3-7 active reminder jobs.`;
  }
}
