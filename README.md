# 🤖 Discord Bot Handler

A modular Discord bot using **Discord.js v13**, designed with a clean handler structure for slash commands, prefix commands, and context menus.

---

## 📁 Project Structure

```
discord-bot-handler/
│
├── config.json                     # Configuration (token, prefix, etc.)
├── index.js                       # Entry point
├── package.json                   # Dependencies and metadata
│
├── commands/
│   ├── slash/                     # Slash commands
│   ├── prefix/                    # Prefix commands
│   └── context/                   # Context menu commands
│
├── events/                        # Event listeners
│
└── utils/
    ├── register-commands.js       # Slash command registration
    └── send-error.js              # Error handling
```

---

## ⚙️ Features

- ✅ **Slash Commands** – Modern commands with interaction responses.
- 💬 **Prefix Commands** – Classic message-based commands.
- 📑 **Context Menus** – Right-click menu integration.
- 🔁 **Reload Support** – Reload slash commands at runtime.
- 🧪 **Eval Command** – Evaluate JavaScript (Owner only).
- 🚫 **Error Handling** – Clean error messages with `send-error.js`.
- 🔗 **Auto Registration** – Register slash commands automatically.

---

## 🧩 Commands Overview

### Slash Commands (`/`)
- `ping` – Simple ping test.
- `help` – Lists available commands.
- `reload` – Reloads all slash commands.
- `eval` – Runs JS code (for owner use only).

### Prefix Commands (`!`)
- `say` – Repeats your message.

### Context Menu
- `message-app.js` – Adds a message context command.

---

## 🛠 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure `config.json`

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID",
  "prefix": "!"
}
```

### 3. Run the Bot

```bash
node index.js
```

---

## 🧠 Best Practices

- Limit the `/eval` command to specific user IDs.
- Run the `/reload` command after editing or adding slash commands.
- Register slash commands once using `register-commands.js` or via the bot startup process.

---

## 📄 License

This project is for educational purposes.
