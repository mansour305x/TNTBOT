import { database } from '../../app/database.js';

export class SmartRepliesService {
  public async overview(guildId: string): Promise<string> {
    const count = await database.client.autoResponse.count({ where: { guildId, enabled: true } });
    return `Active reply rules: ${count}. Recommendation: merge duplicates and keep keywords specific.`;
  }
}
