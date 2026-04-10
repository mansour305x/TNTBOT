import type { ButtonHandler } from '../../types/interaction.js';
import {
  ActionRowBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import { ScheduleService } from '../../modules/schedules/service.js';

const scheduleService = new ScheduleService();
const settingsService = new SettingsService();

export const schedulesButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_sched_create',
    execute: async (interaction) => {
      const guildId = interaction.guildId;
      if (!guildId) {
        await interaction.reply({ content: 'هذا الزر يعمل داخل سيرفر فقط.', ephemeral: true });
        return;
      }

      const settings = await settingsService.getOrCreate(guildId);
      const modal = new ModalBuilder().setCustomId('tnt_modal_schedule_create').setTitle('Create Schedule');
      const nameInput = new TextInputBuilder()
        .setCustomId('name')
        .setLabel('Name')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
      const cronInput = new TextInputBuilder()
        .setCustomId('cron')
        .setLabel('Cron')
        .setPlaceholder('*/30 * * * *')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
      const channelInput = new TextInputBuilder()
        .setCustomId('channelId')
        .setLabel('Channel ID')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
      const actionInput = new TextInputBuilder()
        .setCustomId('actionType')
        .setLabel('Action Type')
        .setValue('notification')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
      const payloadInput = new TextInputBuilder()
        .setCustomId('payload')
        .setLabel(`Message (${settings.language.toUpperCase()})`)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(cronInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(channelInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(actionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(payloadInput)
      );

      await interaction.showModal(modal);
    }
  },
  {
    customId: 'tnt_sched_list',
    execute: async (interaction) => {
      const guildId = interaction.guildId;
      if (!guildId) {
        await interaction.reply({ content: 'هذا الزر يعمل داخل سيرفر فقط.', ephemeral: true });
        return;
      }

      const language = await settingsService.getLanguage(guildId);
      const content = await scheduleService.list(guildId, language);
      await interaction.reply({ content, ephemeral: true });
    }
  },
  {
    customId: 'tnt_sched_toggle',
    execute: async (interaction) => {
      const guildId = interaction.guildId;
      if (!guildId) {
        await interaction.reply({ content: 'هذا الزر يعمل داخل سيرفر فقط.', ephemeral: true });
        return;
      }

      const items = await scheduleService.listItems(guildId);
      if (items.length === 0) {
        await interaction.reply({ content: 'لا توجد جدولات حالياً.', ephemeral: true });
        return;
      }

      const menu = new StringSelectMenuBuilder()
        .setCustomId('tnt_sched_toggle_select')
        .setPlaceholder('Select schedule to toggle')
        .addOptions(items.slice(0, 25).map((item) => ({ label: item.name.slice(0, 100), value: item.id, description: item.cron.slice(0, 100) })));

      await interaction.reply({
        content: 'اختر الجدولة لتبديل حالتها.',
        components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)],
        ephemeral: true
      });
    }
  },
  {
    customId: 'tnt_sched_next',
    execute: async (interaction) => {
      const guildId = interaction.guildId;
      if (!guildId) {
        await interaction.reply({ content: 'هذا الزر يعمل داخل سيرفر فقط.', ephemeral: true });
        return;
      }

      const items = await scheduleService.listItems(guildId);
      if (items.length === 0) {
        await interaction.reply({ content: 'لا توجد جدولات حالياً.', ephemeral: true });
        return;
      }

      const menu = new StringSelectMenuBuilder()
        .setCustomId('tnt_sched_next_select')
        .setPlaceholder('Select schedule to inspect')
        .addOptions(items.slice(0, 25).map((item) => ({ label: item.name.slice(0, 100), value: item.id, description: item.cron.slice(0, 100) })));

      await interaction.reply({
        content: 'اختر الجدولة لمعرفة أقرب تنفيذ.',
        components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)],
        ephemeral: true
      });
    }
  }
];
