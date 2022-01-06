import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import Log from "./util/Log.js";
import chalk from "chalk";
/**
 * Only .env variable is TOKEN
 */
config();
const token = process.env.TOKEN;

const exists = fs.existsSync("./images");
if (!exists) fs.mkdirSync("./images");

const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("messageCreate", async (message) => {
  Log.debug(`${message.author.tag} => ${chalk.bold(message.content)}`);

  const content = message.content;

  if (content.includes("https://media.discordapp.net")) {
    /**
     * Replaced conents of a message.
     */
    let response = content.replace(
      "https://media.discordapp.net",
      "https://cdn.discordapp.com"
    );

    try {
        await client.user.setUsername(message.author.username);
        await message.delete();
        await message.channel.send({
          content: response,
      });
    } catch (e) {
      Log.error(e);
      message.channel.send("An unexepected error happened! :(");
    }
  }
});
/**
 * Just logging in!
 */
client.once("ready", () => {
  Log.info("Logging...!");
});

client.login(token);
