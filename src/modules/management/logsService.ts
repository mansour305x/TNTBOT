import { database } from '../../app/database.js';

export class LogsService {
  public async overview(): Promise<string> {
    const recent = await database.client.errorEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    if (recent.length === 0) {
      return 'No error logs recorded.';
    }

    return recent.map((entry) => `${entry.scope}: ${entry.message}`).join('\n');
  }
}
