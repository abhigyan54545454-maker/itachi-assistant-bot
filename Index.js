import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ✅ Slash command
const commands = [
  new SlashCommandBuilder()
    .setName("work")
    .setDescription("Show earning tasks")
    .toJSON()
];

// ✅ Register command ONCE (safe method)
async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log("Commands registered successfully");
  } catch (err) {
    console.error("Command register error:", err);
  }
}

// ✅ Bot ready
client.once("ready", () => {
  console.log(`🖤 Itachi Assistant online as ${client.user.tag}`);
});

// ✅ Interaction handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "work") {
    await interaction.reply({
      content: `
🖤 ITACHI ASSISTANT

💼 REVIEW WORK  
₹5 - ₹7 (Instant Pay)

📧 GMAIL WORK  
₹6 - ₹8 (Within 24h)

⚡ More missions coming soon...
      `
    });
  }
});

// ✅ START BOT
(async () => {
  if (!token || !clientId) {
    console.log("Missing TOKEN or CLIENT_ID");
    return;
  }

  await registerCommands();
  client.login(token);
})();