const config = require("../config.json");
const sendError = require("../utils/send-error");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      console.error("❌ Error executing prefix command:", err);
      await sendError("Prefix Command Error", err);
      message.reply("An error occurred while executing the command.");
    }
  }
};
