import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import type { ButtonHandler } from '../../types/interaction.js';

function buildModal(
  customId: string,
  title: string,
  inputId: string,
  label: string,
  placeholder: string,
  long = false
): ModalBuilder {
  return new ModalBuilder()
    .setCustomId(customId)
    .setTitle(title)
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId(inputId)
          .setLabel(label)
          .setStyle(long ? TextInputStyle.Paragraph : TextInputStyle.Short)
          .setPlaceholder(placeholder)
          .setRequired(true)
      )
    );
}

export const setupButtonHandlers: ButtonHandler[] = [
  {
    customId: 'tnt_setup_clientid',
    execute: async (interaction) => {
      await interaction.showModal(
        buildModal(
          'tnt_modal_setup_clientid',
          'Set CLIENT_ID',
          'client_id_value',
          'Client ID',
          'e.g. 1234567890123456789'
        )
      );
    }
  },
  {
    customId: 'tnt_setup_guildid',
    execute: async (interaction) => {
      await interaction.showModal(
        buildModal(
          'tnt_modal_setup_guildid',
          'Set GUILD_ID',
          'guild_id_value',
          'Guild (Server) ID',
          'e.g. 9876543210987654321'
        )
      );
    }
  },
  {
    customId: 'tnt_setup_ownerid',
    execute: async (interaction) => {
      await interaction.showModal(
        buildModal(
          'tnt_modal_setup_ownerid',
          'Set OWNER_ID',
          'owner_id_value',
          'Owner User ID',
          'e.g. 1111222233334444555'
        )
      );
    }
  },
  {
    customId: 'tnt_setup_dburl',
    execute: async (interaction) => {
      await interaction.showModal(
        buildModal(
          'tnt_modal_setup_dburl',
          'Set DATABASE_URL',
          'db_url_value',
          'PostgreSQL Connection URL',
          'postgresql://user:pass@host:5432/dbname',
          true
        )
      );
    }
  },
  {
    customId: 'tnt_setup_status',
    execute: async (interaction) => {
      const { buildSetupEmbed, buildSetupPanel } = await import(
        '../../ui/components/setupPanel.js'
      );
      await interaction.update({
        embeds: [buildSetupEmbed()],
        components: buildSetupPanel()
      });
    }
  }
];
