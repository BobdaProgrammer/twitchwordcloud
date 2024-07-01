const tmi = require("tmi.js");
var readline = require("readline");
readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

console.log("press q to exit or c to save the word cloud");

process.stdin.on("keypress", (chunk, key) => {
  if (key && key.name == "q") {
    process.exit();
  } else if (key && key.name == "c") {
    cloud()
  }
});
let chalk;
import("chalk")
  .then((module) => {
    chalk = module.default;
  })
  .catch((err) => {
    console.error("Failed to load chalk:", err);
  });
const fs = require("fs");
const { exec } = require("node:child_process");


let text = "";

const client = new tmi.Client({
  channels : [process.argv[2]]
});

client.connect();
function cloud() {
      console.log("making cloud...");
      fs.writeFileSync("image.txt", text);
      exec(
        `python ./makeImage.py ${process.argv[3]} ${
          process.argv[4] ? process.argv[4] : ""
        }`
  );
  clearTimeout(intervalId);
  intervalId = setTimeout(cloud, 60000);
}
client.on("message", (channel, tags, message, self)=>{
  console.log(chalk.green(`${tags['display-name']}: ${message}`))
  let MessageWords = message.replace(/[/\(\)\.,\-/\[\]&*+=\-<>?!'@{}#~"£$%^\\¬|:;]/g, " ")
  text+=MessageWords+" "
})

intervalId = setTimeout(cloud, 60000);