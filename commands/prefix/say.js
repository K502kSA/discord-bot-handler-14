module.exports = {
  name: "say",
  description: "Repeats your message.",
  execute(message, args) {
    if (!args.length) return message.reply("Please provide a message.");
    message.channel.send(args.join(" "));
  }
};
