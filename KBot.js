const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

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
  	lyrics(message)
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

const request = require('request-promise');
const cheerio = require('cheerio');


async function getLink(url , message){
	const response = await request(url)
	let $ = cheerio.load(response)
	let URL = $('table > tbody > tr:nth-child(1) > td > a').attr('href')
	console.log(URL)
	MSG = message
	scrape(URL , MSG)
	if(!URL){
		return message.channel.send("Lyrics not Found")
	} else return message.channel.send("Here's what we found - ")
}
async function scrape(url , message){
	const response = await request(url)
	let $ = cheerio.load(response)
	let lyrics = $('body > div.container.main-page > div > div.col-xs-12.col-lg-8.text-center > div:nth-child(10)').text()
	console.log(lyrics)
	if(!lyrics){
		return message.channel.send("Lyrics not Found ;-;")
	}
	return message.channel.send(`${lyrics}`)

}
function lyrics(message) {
	query = message.content.split(" ")
	console.log(query)
	query.shift()
	console.log(query)
	line = query.join("+")
	console.log(line)
	url ='https://search.azlyrics.com/search.php?q=' + line
	console.log(url )
	msg = message
	getLink(url , msg)
	searched = query.join(" ")
	return message.channel.send(`You searched lyrics for ${searched}`)
}
client.login(token);