
const { getLink } = require("./getLink.js")

export const fetch_lyrics = (message) => {
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
