import {Client, Intents} from "discord.js"
import {config} from 'dotenv'
import {Log} from './util/Log.js'
config();
import chalk from 'chalk';
/**
 * Only .env variable is TOKEN
 */
const token = process.env.TOKEN;

const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("messageCreate", async (message) => {
 Log.debug(`${message.author.tag} => ${chalk.bold(message.content)}`)
	

  const content = message.content;
  
  if (content.includes("https://media.discordapp.net")) {
    /**
     * We replace the contents of the message.
     */
    let response = content.replace(
      "https://media.discordapp.net",
      "https://cdn.discordapp.com"
    );
    /**
     * We delete the message and send it back with the proper CDN
     * TODO: Implement Avatar & username adapting for easier context.
     */
    await message.delete();
    await message.channel.send({
      content: `Hey <@${message.author.id}>! I converted your URL to the proper CDN! :blush:\n\`\`\`${message.author.username} at ${message.createdAt}\`\`\`\n${response}`,
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
