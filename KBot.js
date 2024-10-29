const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const { fetch_lyrics } = require("./fetch_lyrics.js");

const client = new Discord.Client();


client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;


  if (message.content.startsWith(`${prefix}lyrics`)){
  	fetch_lyrics(message)
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});
 

client.login(token);
