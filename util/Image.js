export default async function downloadImage(link, id) {
  const imageBuffer = await fetch(link);
  let ext = link.split(".").pop();
  Log.debug("downloading image with ext: " + ext);
  await imageBuffer.body.pipe(fs.createWriteStream(`./images/${id}.${ext}`));
  return `./images/${id}.${ext}`;
}
