const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("../config.json");

module.exports = async (commands, client) => {
  if (!config.token || !config.clientId) {
    return console.error("❌ Missing token or clientId in config.json");
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  const slashPath = path.join(__dirname, "../commands/slash");
  const slashFiles = fs.readdirSync(slashPath).filter(file => file.endsWith(".js"));
  const slashCount = slashFiles.length;

  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
  const eventCount = eventFiles.length;

  const prefixPath = path.join(__dirname, "../commands/prefix");
  const prefixFiles = fs.readdirSync(prefixPath).filter(file => file.endsWith(".js"));
  const prefixCount = prefixFiles.length;

  const contextPath = path.join(__dirname, "../commands/context");
  const contextFiles = fs.readdirSync(contextPath).filter(file => file.endsWith(".js"));
  const contextCount = contextFiles.length;

  try {
    console.log("🌐 Registering global slash commands...");
    await rest.put(Routes.applicationCommands(config.clientId), { body: commands });

    console.clear();

    const botName = client?.user?.username || "Unknown";
    const botId = client?.user?.id || "Unknown";

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🤖 Logged in as: ${botName}`);
    console.log(`🆔 Bot ID: ${botId}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📊 Stats`);
    console.log(`🔹 Slash Commands: ${slashCount}`);
    console.log(`🔹 Prefix Commands: ${prefixCount}`);
    console.log(`🔹 Context Menus: ${contextCount}`);
    console.log(`🔹 Events: ${eventCount}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("❌ Failed to register global commands:", error);
  }
};
