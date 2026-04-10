import type { Guild } from 'discord.js';
import { SettingsService } from '../settings/settingsService.js';

export class WelcomeService {
  private readonly settingsService = new SettingsService();

  public async overview(guild: Guild): Promise<string> {
    const settings = await this.settingsService.getOrCreate(guild.id);
    return settings.language === 'ar'
      ? `مرحبا بك في ${guild.name}\nاللغة الحالية: العربية\nالمنطقة الزمنية: ${settings.timezone}`
      : `Welcome to ${guild.name}\nCurrent language: English\nTimezone: ${settings.timezone}`;
  }
}
