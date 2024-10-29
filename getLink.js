const request = require('request-promise');
const cheerio = require('cheerio');
const { scrape_lyrics } = require("./scrape_lyrics.js")
export const getLink = async (url , message) => {
	const response = await request(url)
	let $ = cheerio.load(response)
	let URL = $('table > tbody > tr:nth-child(1) > td > a').attr('href')
	console.log(URL)
	MSG = message
	scrape_lyrics(URL , MSG)
	if(!URL){
		return message.channel.send("Lyrics not Found")
	} else return message.channel.send("Here's what we found - ")
}
