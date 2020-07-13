const { prefix, token, cooldown } = require('./config.json');

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


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
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) 
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return; // Ignore commands that don't exist

  // Check command execution permissions
  if (command.admin && !message.member.hasPermission(command.admin)) {
    return; // Do nothing, kek
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('My b, I can\'t execute that command inside DMs');
  }  

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`); // Maybe add help line?
  }

  // Some cooldown handling I guess
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || cooldown) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Falco missed a ledgedash trying to execute that command');
  }
});


client.login(token);
