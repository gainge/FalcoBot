const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  console.log(`Falco Hears: ${message.content}`);

  if (message.content.toLowerCase() === 'jv') {
    message.channel.send('you won\'t');
  }
});


client.login(token);
