const check = require("is-url")
const fetch = require("node-fetch")
module.exports = {
  name: "uptime",
  run: async (client, message, args, db) => {
  let link = args[0];
  if (!link) return message.channel.send(":x: | **No link provided**")
  if (link.match(/https?:\/\/[a-z]+\.glitch\.me\/?/gi)) return message.channel.send(":x: | **You cannot uptime glitch projects**")
  if (check(link) === false) return message.channel.send(":x: | **That isnt a valid URL!**")
  let database = db.get("links")
  if (database) {
  let pog = database.map(l => l.url)
  if (pog.includes(link)) {
    message.delete().catch(err => undefined)
    return message.channel.send(":x: | **The link is already uptimed!**")
  }
  }
  fetch(link).then(() => {
    let data = {
    author: message.author.id,
    url: link
    }
    message.delete().catch(err => undefined)
    db.push("links", data)
    let embed = new client.embed()
    .setColor(client.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setURL("https://github.com/legend-js-dev/uptimer")
    .setDescription("**The URL is now uptimed**")
    .setFooter(message.guild.name + " | made by legend-js, https://github.com/legend-js-dev/uptimer", message.guild.iconURL())
    .setTimestamp()
    return message.channel.send({ embed: embed })
  }).catch(err => {
    return message.channel.send(":x: | **Error: The link is not valid**")
  })
  }
}