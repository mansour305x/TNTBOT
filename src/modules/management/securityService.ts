import type { Guild } from 'discord.js';

export class SecurityService {
  public async overview(guild: Guild): Promise<string> {
    return [
      `Verification Level: ${guild.verificationLevel}`,
      `Explicit Filter: ${guild.explicitContentFilter}`,
      `MFA Level: ${guild.mfaLevel}`,
      `Members: ${guild.memberCount}`
    ].join('\n');
  }
}
