import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import Log from "./util/Log.js";
/**
 * Only .env variable is TOKEN
 */
config();
const token = process.env.TOKEN;

if (!fs.existsSync("./images")) fs.mkdirSync("./images");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (message) => {
  if (message.content.includes("https://media.discordapp.net")) {
    const response = content.replace(
      "https://media.discordapp.net",
      "https://cdn.discordapp.com"
    );

    await message
      .delete()
      .catch((err) => message.channel.send("Error deleting the message!"));
    await message.channel
      .send({
        content: `${response}\n\n\`This mesage was sent by a bot.\``,
      })
      .catch((err) => message.channel.send("Error replying!"));
  }
});

client.once("ready", () => Log.info("Logging...!"));

client.login(token);
