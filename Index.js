import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";
import config from "./config.json" assert { type: "json" };

// 🖤 Itachi Assistant Bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ===== SLASH COMMANDS =====
const commands = [
  new SlashCommandBuilder()
    .setName("work")
    .setDescription("Show earning tasks")
    .toJSON()
];

// ===== REGISTER COMMANDS =====
const rest = new REST({ version: "10" }).setToken(config.token);

async function registerCommands() {
  try {
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );
    console.log("🖤 Commands registered successfully");
  } catch (err) {
    console.error("Command register error:", err);
  }
}

// ===== BOT READY =====
client.on("ready", () => {
  console.log(`🖤 Itachi Assistant is online as ${client.user.tag}`);
});

// ===== COMMAND HANDLER =====
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "work") {
    await interaction.reply({
      content: `
🖤 **ITACHI ASSISTANT - WORK PANEL**

💼 REVIEW WORK  
Instant Pay  
₹5 - ₹7  

📧 GMAIL WORK  
Instant Pay (within 24 hours)  
₹6 - ₹8  

⚡ More missions will unlock soon...
      `
    });
  }
});

// ===== START BOT =====
registerCommands().then(() => {
  client.login(config.token);
});