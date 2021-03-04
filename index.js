console.clear();
console.log('[INFO]: Loading...');
console.log('-------------------------------------');
//uptimer bot coded by legend >:D
const Client = require("./Structures/legendJsClient.js")
const Discord = require('discord.js');
require("./Structures/Message.js")
const { prefix, token } = require('./config.json');
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
	disableMentions: 'everyone'
});
const fetch = require("node-fetch")
const db = require("quick.db")
client.loadCommands(client)
console.log('-------------------------------------');
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`);
console.log('-------------------------------------');
console.log('[CREDITS]: made by legend-js, https://github.com/legend-js-dev')
console.log('-------------------------------------');
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	console.log(`[INFO]: watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`)
	console.log('-------------------------------------');
	client.user.setActivity('uptimer bot by legend :D', {
		type: 'WATCHING'
	});
});

setInterval(() => {
  let links = db.get("links")
  if (!links) return;
  let bruh = links.map(link => link.url)
  bruh.forEach(link => {
    try {
      fetch(link)
    } catch (err) {
      return;
    }
  })
}, 60000)

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args, db);
});

client.login(token).catch(err => {
	console.log('[ERROR]: Invalid Token Provided');
});