const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate JavaScript code")
    .addStringOption(option => option.setName("code").setDescription("Code to evaluate").setRequired(true)),

  async execute(interaction) {
    if (!config.developers.includes(interaction.user.id)) return interaction.reply({ content: "❌ You are not authorized.", ephemeral: true });

    const code = interaction.options.getString("code");
    try {
      const result = eval(code);
      await interaction.reply({ content: `✅ Output: \`\`\`js
${result}
\`\`\``, ephemeral: true });
    } catch (err) {
      await interaction.reply({ content: `❌ Error: \`\`\`js
${err.message}
\`\`\``, ephemeral: true });
    }
  }
};
