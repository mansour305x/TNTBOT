import { database } from '../../app/database.js';

export class AutoResponsesService {
  public async overview(guildId: string): Promise<string> {
    const items = await database.client.autoResponse.findMany({
      where: { guildId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    if (items.length === 0) {
      return 'No auto responses found.';
    }

    return items.map((item) => `${item.keyword} => ${item.enabled ? 'ON' : 'OFF'}`).join('\n');
  }

  public async create(guildId: string, keyword: string, responseAr: string, responseEn: string): Promise<string> {
    const item = await database.client.autoResponse.create({
      data: {
        guildId,
        keyword,
        responseAr,
        responseEn,
        enabled: true
      }
    });

    return item.id;
  }
}
