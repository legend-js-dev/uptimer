module.exports = {
  name: "delete",
  aliases: ["del"],
  run: async (client, message, args, db) => {
    let link = args[0];
    let pog = db.get("links")
    if (pog) {
      let pog2 = pog.find((x) => x.url.toLowerCase() === link.toLowerCase());
      if (pog2.author !== message.author.id) {
      return message.channel.send(":x: | **The URL wasnt added by you!**")
      }
      let lol = new client.embed()
                lol.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                lol.setDescription(`:x: | **The URL isnt uptimed!**`)
                lol.setColor("#FF0000")
                lol.setFooter(message.guild.name + " | made by legend-js, https://github.com/legend-js-dev/uptimer", message.guild.iconURL());
                lol.setThumbnail(message.guild.iconURL())

            if (!pog2) return message.channel.send({ embed: lol });
            
            let index = pog.indexOf(pog2);
            delete pog[index];
            
            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            message.delete().catch(err => undefined)
            db.set("links", filter)
let embed = new client.embed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`**The URL has been deleted from the database!** `)
                embed.setFooter(message.guild.name + " | made by legend-js, https://github.com/legend-js-dev/uptimer", message.guild.iconURL());
embed.setColor("GREEN")
embed.setTimestamp()
            return message.channel.send({ embed: embed });
    } else {
            let embed = new client.embed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                embed.setDescription(`:x: | **The URL isnt uptimed!**`)
                embed.setColor("#FF0000")
                embed.setFooter(message.guild.name + " | made by legend-js, https://github.com/legend-js-dev/uptimer", message.guild.iconURL());
                embed.setThumbnail(message.guild.iconURL())
                return message.channel.send({ embed: embed })
    }
  }
}