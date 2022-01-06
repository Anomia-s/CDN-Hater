import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import Log from "./util/Log.js";
import chalk from "chalk";
import Image from "./util/Image.js";
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
     * We replace the contents of the message.
     */
    let response = content.replace(
      "https://media.discordapp.net",
      "https://cdn.discordapp.com"
    );
    Log.info(message.author.avatarURL());
    const userImage = await Image(
      message.author.avatarURL(),
      message.author.id
    );
    await client.user.setAvatar(userImage);
    await client.user.setUsername(message.author.username);
    await message.delete();
    await message.channel.send({
      content: response,
    });
  }
});
/**
 * Just logging in!
 */
client.once("ready", () => {
  Log.info("Logging...!");
});

client.login(token);
