const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all available commands'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📖 Help')
      .setDescription('Available commands:\n• `/ping` - Check bot latency\n• `!say` - Repeat a message\n• `/help` - Show this help menu\n• `/eval`, `/reload` - Developer only');
    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
