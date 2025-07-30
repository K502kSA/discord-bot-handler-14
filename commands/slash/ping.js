const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot and API latency'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const apiPing = interaction.client.ws.ping;
    const botPing = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
      content: '',
      embeds: [
        {
          title: '🏓 Pong!',
          fields: [
            { name: 'Bot Latency', value: `${botPing}ms`, inline: true },
            { name: 'API Latency', value: `${apiPing}ms`, inline: true }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    });
  }
};
