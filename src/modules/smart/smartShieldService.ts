import type { Guild } from 'discord.js';

export class SmartShieldService {
  public async overview(guild: Guild): Promise<string> {
    const risk = guild.verificationLevel === 0 ? 'HIGH' : guild.verificationLevel < 2 ? 'MEDIUM' : 'LOW';
    return `Shield risk score: ${risk}. Verification=${guild.verificationLevel}, MFA=${guild.mfaLevel}.`;
  }
}
