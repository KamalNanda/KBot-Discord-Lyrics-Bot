const cheerio = require('cheerio');
const request = require('request-promise');
const scrape_lyrics = async (url , message) => {
	const response = await request(url)
	let $ = cheerio.load(response)
	let lyrics = $('body > div.container.main-page > div > div.col-xs-12.col-lg-8.text-center > div:nth-child(10)').text()
	console.log(lyrics)
	if(!lyrics){
		return message.channel.send("Lyrics not Found ;-;")
	}
	return message.channel.send(`${lyrics}`)
}
