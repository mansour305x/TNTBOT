import type { GuildConfig, Language } from '@prisma/client';
import { database } from '../../app/database.js';
import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
  DEFAULT_TIMEZONE
} from '../../config/constants.js';

export class SettingsService {
  public async getOrCreate(guildId: string): Promise<GuildConfig> {
    return database.client.guildConfig.upsert({
      where: { guildId },
      update: {},
      create: {
        guildId,
        language: 'ar',
        timezone: DEFAULT_TIMEZONE,
        primaryColor: DEFAULT_PRIMARY_COLOR,
        secondaryColor: DEFAULT_SECONDARY_COLOR,
        notificationsEnabled: true,
        maintenanceMode: false
      }
    });
  }

  public async getLanguage(guildId: string): Promise<Language> {
    const settings = await this.getOrCreate(guildId);
    return settings.language;
  }

  public async overview(guildId: string): Promise<string> {
    const settings = await this.getOrCreate(guildId);
    return [
      `Language: ${settings.language}`,
      `Timezone: ${settings.timezone}`,
      `Primary: ${settings.primaryColor}`,
      `Secondary: ${settings.secondaryColor}`,
      `Notifications: ${settings.notificationsEnabled}`,
      `Maintenance: ${settings.maintenanceMode}`
    ].join('\n');
  }

  public async updateLanguage(guildId: string, language: Language): Promise<GuildConfig> {
    await this.getOrCreate(guildId);
    return database.client.guildConfig.update({
      where: { guildId },
      data: { language }
    });
  }

  public async updateTimezone(guildId: string, timezone: string): Promise<GuildConfig> {
    await this.getOrCreate(guildId);
    return database.client.guildConfig.update({
      where: { guildId },
      data: { timezone }
    });
  }

  public async updateColors(guildId: string, primaryColor: string, secondaryColor: string): Promise<GuildConfig> {
    await this.getOrCreate(guildId);
    return database.client.guildConfig.update({
      where: { guildId },
      data: { primaryColor, secondaryColor }
    });
  }

  public async toggleNotifications(guildId: string): Promise<GuildConfig> {
    const current = await this.getOrCreate(guildId);
    return database.client.guildConfig.update({
      where: { guildId },
      data: { notificationsEnabled: !current.notificationsEnabled }
    });
  }

  public async toggleMaintenance(guildId: string): Promise<GuildConfig> {
    const current = await this.getOrCreate(guildId);
    return database.client.guildConfig.update({
      where: { guildId },
      data: { maintenanceMode: !current.maintenanceMode }
    });
  }
}
