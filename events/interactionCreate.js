const sendError = require("../utils/send-error");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error("❌ Error executing slash command:", err);
        await sendError("Slash Command Error", err);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: "An error occurred while executing the command.", ephemeral: true });
        } else {
          await interaction.reply({ content: "An error occurred while executing the command.", ephemeral: true });
        }
      }
    } else if (interaction.isContextMenuCommand()) {
      const command = client.contextMenus.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error("❌ Error executing context menu command:", err);
        await sendError("Context Menu Command Error", err);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: "An error occurred while executing the context menu command.", ephemeral: true });
        } else {
          await interaction.reply({ content: "An error occurred while executing the context menu command.", ephemeral: true });
        }
      }
    }
  }
};
