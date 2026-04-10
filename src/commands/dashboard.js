/**
 * Dashboard Command
 * أمر لوحة التحكم الرئيسية
 */

const { SlashCommandBuilder } = require('discord.js');
const { createMainDashboardEmbed } = require('../utils/embeds.js');
const { createMainDashboardButtons } = require('../utils/buttons.js');
const logger = require('../utils/logger.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dashboard')
    .setDescription('لوحة تحكم تي ان تي | TNT Control Panel'),

  async execute(interaction) {
    try {
      logger.logInteraction(interaction);

      const embed = createMainDashboardEmbed();
      const buttons = createMainDashboardButtons();

      await interaction.reply({
        embeds: [embed],
        components: buttons,
        ephemeral: true
      });

      logger.success(`Dashboard opened by ${interaction.user.tag}`);
    } catch (error) {
      logger.error('Error executing dashboard command:', error);
      
      await interaction.reply({
        content: '❌ حدث خطأ أثناء فتح لوحة التحكم.\n❌ An error occurred while opening the dashboard.',
        ephemeral: true
      }).catch(() => {});
    }
  }
};
