import { database } from '../../app/database.js';

export class TicketsService {
  public async overview(guildId: string): Promise<string> {
    const tickets = await database.client.ticket.findMany({
      where: { guildId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    if (tickets.length === 0) {
      return 'No tickets found.';
    }

    return tickets.map((ticket) => `${ticket.id} | ${ticket.status} | ${ticket.channelId}`).join('\n');
  }
}
