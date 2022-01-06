import fetch from "node-fetch";
import Log from "./Log.js";
import fs from "fs";
export default async function downloadImage(link, id) {
  const imageBuffer = await fetch(link);
  let ext = link.split(".").pop();
  Log.debug("downloading image with ext: " + ext);
  try {
    await imageBuffer.body.pipe(fs.createWriteStream(`./images/${id}.${ext}`));
  } catch (e) {
    Log.error(e);
  }
  return `./images/${id}.${ext}`;
}
