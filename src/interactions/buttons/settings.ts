import type { ButtonHandler } from '../../types/interaction.js';
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import { SettingsService } from '../../modules/settings/settingsService.js';

const settingsService = new SettingsService();

export const settingsButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_set_language',
    execute: async (interaction) => {
      const modal = new ModalBuilder().setCustomId('tnt_modal_language').setTitle('Language');
      const input = new TextInputBuilder()
        .setCustomId('language')
        .setLabel('Language: ar or en')
        .setPlaceholder('ar')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(2);
      modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));
      await interaction.showModal(modal);
    }
  },
  {
    customId: 'tnt_set_timezone',
    execute: async (interaction) => {
      const modal = new ModalBuilder().setCustomId('tnt_modal_timezone').setTitle('Timezone');
      const input = new TextInputBuilder()
        .setCustomId('timezone')
        .setLabel('Timezone')
        .setPlaceholder('Asia/Riyadh')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
      modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));
      await interaction.showModal(modal);
    }
  },
  {
    customId: 'tnt_set_colors',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      const settings = await settingsService.getOrCreate(interaction.guildId);
      await interaction.reply({
        content: `Primary: ${settings.primaryColor}\nSecondary: ${settings.secondaryColor}`,
        ephemeral: true
      });
    }
  },
  {
    customId: 'tnt_set_notifications',
    execute: async (interaction) => {
      if (!interaction.guildId) {
        await interaction.reply({ content: 'هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
        return;
      }
      const updated = await settingsService.toggleNotifications(interaction.guildId);
      await interaction.reply({
        content: `Notifications: ${updated.notificationsEnabled}`,
        ephemeral: true
      });
    }
  }
];
