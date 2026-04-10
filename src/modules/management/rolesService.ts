import type { Guild } from 'discord.js';

export class RolesService {
  public async overview(guild: Guild): Promise<string> {
    const roles = await guild.roles.fetch();
    const filtered = roles.filter(Boolean).filter((role) => role.id !== guild.id);
    const top = filtered
      .sort((left, right) => right.position - left.position)
      .first(10)
      .map((role) => `${role.name} (${role.members.size})`);

    return [`Total Roles: ${filtered.size}`, ...top].join('\n');
  }
}
