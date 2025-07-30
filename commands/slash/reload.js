const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");
const config = require("../../config.json");
const { Collection } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload all commands (slash, prefix, context)"),

  async execute(interaction) {
    if (!config.developers.includes(interaction.user.id)) {
      return interaction.reply({ content: "❌ You are not authorized.", ephemeral: true });
    }

    try {
      const client = interaction.client;

      if (!client.slashCommands) client.slashCommands = new Collection();
      else client.slashCommands.clear();

      if (!client.prefixCommands) client.prefixCommands = new Collection();
      else client.prefixCommands.clear();

      if (!client.contextCommands) client.contextCommands = new Collection();
      else client.contextCommands.clear();

      const basePath = path.join(__dirname, "../..");
      const slashPath = path.join(basePath, "commands", "slash");
      const prefixPath = path.join(basePath, "commands", "prefix");
      const contextPath = path.join(basePath, "commands", "context");

      // ✅ Reload Slash Commands
      fs.readdirSync(slashPath).forEach(file => {
        const filePath = path.join(slashPath, file);
        delete require.cache[require.resolve(filePath)];

        const command = require(filePath);
        if (command.data && command.execute) {
          client.slashCommands.set(command.data.name, command);
        }
      });

      // ✅ Reload Prefix Commands
      fs.readdirSync(prefixPath).forEach(file => {
        const filePath = path.join(prefixPath, file);
        delete require.cache[require.resolve(filePath)];

        const command = require(filePath);
        if (command.name && command.execute) {
          client.prefixCommands.set(command.name, command);
        }
      });

      // ✅ Reload Context Commands
      fs.readdirSync(contextPath).forEach(file => {
        const filePath = path.join(contextPath, file);
        delete require.cache[require.resolve(filePath)];

        const command = require(filePath);
        if (command.data && command.execute) {
          client.contextCommands.set(command.data.name, command);
        }
      });

      await interaction.reply({ content: "✅ Reloaded all commands.", ephemeral: true });
    } catch (err) {
      console.error("Reload Error:", err);
      await interaction.reply({
        content: `❌ Error while reloading:\n\`\`\`${err.message}\`\`\``,
        ephemeral: true
      });
    }
  }
};
