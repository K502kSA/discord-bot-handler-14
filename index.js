const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const registerCommands = require("./utils/register-commands");
const sendError = require("./utils/send-error");

const allIntents = Object.values(GatewayIntentBits);

const client = new Client({
  intents: allIntents
});

client.slashCommands = new Collection();
client.prefixCommands = new Collection();
client.contextMenus = new Collection();

// Load slash commands
const slashCommands = [];
fs.readdirSync("./commands/slash").forEach(file => {
  const command = require(`./commands/slash/${file}`);
  client.slashCommands.set(command.data.name, command);
  slashCommands.push(command.data.toJSON());
});

// Load prefix commands
fs.readdirSync("./commands/prefix").forEach(file => {
  const command = require(`./commands/prefix/${file}`);
  client.prefixCommands.set(command.name, command);
});

// Load events
fs.readdirSync("./events").forEach(file => {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

// Load context menus
fs.readdirSync("./commands/context").forEach(file => {
  const command = require(`./commands/context/${file}`);
  if (!command.data || !command.execute) return;
  client.contextMenus.set(command.data.name, command);
  slashCommands.push(command.data.toJSON());
});

// Register slash commands globally
client.once("ready", async () => {
  await registerCommands(slashCommands, client);
});

process.on("unhandledRejection", async (reason) => {
  console.error("🛑 Unhandled Rejection:", reason);
  await sendError("Unhandled Rejection", reason);
});

process.on("uncaughtException", async (err) => {
  console.error("💥 Uncaught Exception:", err);
  await sendError("Uncaught Exception", err);
});

client.login(config.token);
