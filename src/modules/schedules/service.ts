import type { Language, Schedule } from '@prisma/client';
import { t } from '../../app/i18n.js';
import { client } from '../../core/client.js';
import { logger } from '../../core/logger.js';
import { scheduler } from '../../core/scheduler.js';
import { SettingsService } from '../settings/settingsService.js';
import { ScheduleRepository } from './repository.js';
import { createScheduleSchema } from './validator.js';

export class ScheduleService {
  private readonly repository = new ScheduleRepository();
  private readonly settingsService = new SettingsService();

  public async createDefault(guildId: string): Promise<string> {
    const settings = await this.settingsService.getOrCreate(guildId);
    const item = await this.create({
      guildId,
      name: 'Default TNT Schedule',
      cron: '*/30 * * * *',
      channelId: guildId,
      actionType: 'notification',
      payloadAr: 'تنفيذ الجدولة الافتراضية.',
      payloadEn: 'Default schedule executed.',
      timezone: settings.timezone
    });

    return item.id;
  }

  public async create(input: unknown): Promise<Schedule> {
    const parsed = createScheduleSchema.parse(input);
    await this.repository.ensureGuild(parsed.guildId, parsed.timezone);
    const item = await this.repository.create(parsed);
    this.register(item);
    return item;
  }

  public async hydrate(): Promise<void> {
    const schedules = await this.repository.listEnabled();
    for (const item of schedules) {
      this.register(item);
    }
  }

  public async listItems(guildId: string): Promise<Schedule[]> {
    return this.repository.listByGuild(guildId);
  }

  public async list(guildId: string, language: Language): Promise<string> {
    const rows = await this.listItems(guildId);
    if (rows.length === 0) {
      return t(language, 'noSchedules');
    }

    return rows
      .map(
        (scheduleItem, index) =>
          `${index + 1}. ${scheduleItem.name} | ${scheduleItem.cron} | ${scheduleItem.enabled ? 'ON' : 'OFF'} | ${scheduleItem.id}`
      )
      .join('\n');
  }

  public async toggle(id: string, guildId: string): Promise<Schedule> {
    const existing = await this.requireSchedule(id, guildId);
    const updated = await this.repository.update(id, { enabled: !existing.enabled });

    if (updated.enabled) {
      this.register(updated);
    } else {
      scheduler.stop(updated.id);
    }

    return updated;
  }

  public async update(id: string, guildId: string, data: Partial<Pick<Schedule, 'name' | 'cron' | 'channelId' | 'actionType' | 'payloadAr' | 'payloadEn' | 'timezone'>>): Promise<Schedule> {
    const existing = await this.requireSchedule(id, guildId);
    const updated = await this.repository.update(id, {
      ...data,
      enabled: existing.enabled
    });

    if (updated.enabled) {
      this.register(updated);
    }

    return updated;
  }

  public async duplicate(id: string, guildId: string): Promise<Schedule> {
    const existing = await this.requireSchedule(id, guildId);
    const duplicate = await this.repository.create({
      guildId: existing.guildId,
      name: `${existing.name} Copy`,
      cron: existing.cron,
      channelId: existing.channelId,
      actionType: existing.actionType,
      payloadAr: existing.payloadAr,
      payloadEn: existing.payloadEn,
      enabled: existing.enabled,
      timezone: existing.timezone
    });

    if (duplicate.enabled) {
      this.register(duplicate);
    }

    return duplicate;
  }

  public async delete(id: string, guildId: string): Promise<void> {
    await this.requireSchedule(id, guildId);
    await this.repository.delete(id);
    scheduler.stop(id);
  }

  public async getNextTrigger(id: string, guildId: string): Promise<Date | null> {
    const item = await this.requireSchedule(id, guildId);
    if (item.enabled) {
      this.register(item);
    }
    return scheduler.getNextInvocation(item.id);
  }

  private async requireSchedule(id: string, guildId: string): Promise<Schedule> {
    const item = await this.repository.findById(id);
    if (!item || item.guildId !== guildId) {
      throw new Error('Schedule not found');
    }

    return item;
  }

  private register(item: Schedule): void {
    scheduler.register({
      id: item.id,
      cron: item.cron,
      enabled: item.enabled,
      job: async () => {
        await this.execute(item.id);
      }
    });
  }

  private async execute(scheduleId: string): Promise<void> {
    const item = await this.repository.findById(scheduleId);
    if (!item || !item.enabled) {
      return;
    }

    const settings = await this.settingsService.getOrCreate(item.guildId);
    const channel = await client.channels.fetch(item.channelId);
    if (!channel || !('send' in channel)) {
      logger.warn({ scheduleId }, 'Schedule channel is not writable');
      return;
    }

    const textChannel = channel as { send: (payload: { content: string }) => Promise<unknown> };
    const content = settings.language === 'ar' ? item.payloadAr : item.payloadEn;
    await textChannel.send({ content });
    logger.info({ scheduleId }, 'Schedule executed');
  }
}
