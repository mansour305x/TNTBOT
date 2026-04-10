import type { ModalHandler } from '../../../types/interaction.js';
import { persistEnvKey } from '../../../config/setupConfig.js';
import { buildSetupEmbed, buildSetupPanel } from '../../../ui/components/setupPanel.js';

function scheduleRestart(): void {
  // Give Discord time to receive the acknowledgement before we exit.
  // tsx watch will auto-restart the process when it exits.
  setTimeout(() => process.exit(0), 1500);
}

async function replyStatus(interaction: Parameters<ModalHandler['execute']>[0]): Promise<void> {
  await interaction.reply({
    embeds: [buildSetupEmbed()],
    components: buildSetupPanel(),
    ephemeral: true
  });
}

export const setupModalHandlers: ModalHandler[] = [
  {
    customId: 'tnt_modal_setup_clientid',
    execute: async (interaction) => {
      const value = interaction.fields.getTextInputValue('client_id_value').trim();
      persistEnvKey('CLIENT_ID', value);
      await replyStatus(interaction);
      scheduleRestart();
    }
  },
  {
    customId: 'tnt_modal_setup_guildid',
    execute: async (interaction) => {
      const value = interaction.fields.getTextInputValue('guild_id_value').trim();
      persistEnvKey('GUILD_ID', value);
      await replyStatus(interaction);
      scheduleRestart();
    }
  },
  {
    customId: 'tnt_modal_setup_ownerid',
    execute: async (interaction) => {
      const value = interaction.fields.getTextInputValue('owner_id_value').trim();
      persistEnvKey('OWNER_ID', value);
      await replyStatus(interaction);
      scheduleRestart();
    }
  },
  {
    customId: 'tnt_modal_setup_dburl',
    execute: async (interaction) => {
      const value = interaction.fields.getTextInputValue('db_url_value').trim();
      persistEnvKey('DATABASE_URL', value);
      await replyStatus(interaction);
      scheduleRestart();
    }
  }
];
