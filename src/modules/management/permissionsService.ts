import type { Guild } from 'discord.js';

export class PermissionsService {
  public async overview(guild: Guild): Promise<string> {
    const roles = await guild.roles.fetch();
    const lines = roles
      .filter(Boolean)
      .filter((role) => role.id !== guild.id)
      .sort((left, right) => right.position - left.position)
      .first(8)
      .map((role) => {
        const permissions = role.permissions;
        return `${role.name}: ADMIN=${permissions.has('Administrator')} MANAGE_ROLES=${permissions.has('ManageRoles')} MANAGE_CHANNELS=${permissions.has('ManageChannels')}`;
      });

    return lines.join('\n');
  }
}
