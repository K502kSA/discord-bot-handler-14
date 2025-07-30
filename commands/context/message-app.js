const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("App Info")
    .setType(ApplicationCommandType.Message),

  async execute(interaction) {
    const message = interaction.targetMessage;
    await interaction.reply({ content: `📝 You selected this message: "${message.content}"`, ephemeral: true });
  }
};
