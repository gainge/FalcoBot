const Discord = require('discord.js');

module.exports = {
	name: 'slippi',
	description: 'Shows information for slippi rollback netplay build',
    // args: true,
    // guildOnly: true,
    // cooldown: 5,
    aliases: ['slp'],
	execute(message, args) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#44A963')
      .setTitle('Slippi')
      .setURL('https://slippi.gg/')
      // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('Slippi Rollback Netcode')
      .setThumbnail('https://avatars1.githubusercontent.com/u/45867030?s=400&v=4')
      // .addFields(
      //   { name: 'Regular field title', value: 'Some value here' },
      //   { name: '\u200B', value: '\u200B' },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      // )
      // .addField('Inline field title', 'Some value here', true)
      .setTimestamp()
      // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
      ;
  
    message.channel.send(exampleEmbed);

    // message.channel.send('Foo');
    // return message.reply('Bar');
	},
};