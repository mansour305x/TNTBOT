import type { Prisma, Schedule } from '@prisma/client';
import { database } from '../../core/database.js';

type CreateScheduleInput = Prisma.ScheduleUncheckedCreateInput;
type UpdateScheduleInput = Prisma.ScheduleUncheckedUpdateInput;

export class ScheduleRepository {
  public async ensureGuild(guildId: string, timezone: string): Promise<void> {
    await database.client.guildConfig.upsert({
      where: { guildId },
      update: {},
      create: {
        guildId,
        language: 'ar',
        timezone,
        primaryColor: '#D4AF37',
        secondaryColor: '#C0C0C0',
        notificationsEnabled: true,
        maintenanceMode: false
      }
    });
  }

  public async create(input: CreateScheduleInput): Promise<Schedule> {
    return database.client.schedule.create({ data: input });
  }

  public async update(id: string, input: UpdateScheduleInput): Promise<Schedule> {
    return database.client.schedule.update({
      where: { id },
      data: input
    });
  }

  public async delete(id: string): Promise<Schedule> {
    return database.client.schedule.delete({
      where: { id }
    });
  }

  public async findById(id: string): Promise<Schedule | null> {
    return database.client.schedule.findUnique({
      where: { id }
    });
  }

  public async listByGuild(guildId: string): Promise<Schedule[]> {
    return database.client.schedule.findMany({
      where: { guildId },
      orderBy: { createdAt: 'desc' }
    });
  }

  public async listEnabled(): Promise<Schedule[]> {
    return database.client.schedule.findMany({
      where: { enabled: true }
    });
  }
}
