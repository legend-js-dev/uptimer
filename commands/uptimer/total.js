module.exports = {
  name: "total",
  run: async (client, message, args, db) => {
    let links = db.get("links")
    if (!links) links = [];
    let total = links.length
    return message.reply(`**There are a total of ${total} links uptimed**`)
  }
}
