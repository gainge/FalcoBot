const { prefix, token } = require('./config.json');

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  // Dodge gross messages that don't have anything to do with us
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  console.log(`Falco Hears: ${message.content}`);

  // Split by whitespace rather than ' '
  // Filter args to remove empty elements
  const args = message.content.slice(prefix.length).split(/\s+/).filter(Boolean);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return; // Ignore commands that don't exist

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Falco missed a ledgedash trying to execute that command');
  }
});


client.login(token);
