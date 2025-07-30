const { WebhookClient, EmbedBuilder } = require("discord.js");
const config = require("../config.json");

const webhook = new WebhookClient({ url: config.errorWebhook });

module.exports = async (title, error) => {
  try {
    const embed = new EmbedBuilder()
      .setTitle(`🚨 ${title}`)
      .setDescription(`\`\`\`js\n${(error.stack || error).toString().slice(0, 4000)}\n\`\`\``)
      .setColor(0xff0000)
      .setTimestamp();

    await webhook.send({ embeds: [embed] });
  } catch (err) {
    console.error("❌ Failed to send error to webhook:", err);
  }
};
