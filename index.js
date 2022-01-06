import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import fetch from "node-fetch";
import { Log } from "./util/Log.js";
config();
import chalk from "chalk";
/**
 * Only .env variable is TOKEN
 */
const token = process.env.TOKEN;

const exists = fs.existsSync("./images");
if (!exists) fs.mkdirSync("./images");

async function downloadImage(link, id) {
  const imageBuffer = await fetch(link);
  let ext = link.split(".").pop();
  Log.debug("downloading image with ext: " + ext);
  await imageBuffer.body.pipe(fs.createWriteStream(`./images/${id}.${ext}`));
  return `./images/${id}.${ext}`;
}

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
    const image = await downloadImage(
      message.author.avatarURL(),
      message.author.id
    );
    await client.user.setAvatar(image);
    await client.user.setUsername(message.author.username);
    /**
     * We delete the message and send it back with the proper CDN
     * TODO: Implement Avatar & username adapting for easier context.
     */
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
