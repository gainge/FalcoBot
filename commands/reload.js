const Discord = require('discord.js');

module.exports = {
	name: 'reload',
  description: 'Reloads a command',
  args: true,
  admin: Discord.Permissions.FLAGS.MANAGE_ROLES,
	execute(message, args) {
    // TODO: add some kind of permissions checking for admins only
    // Maybe could even be done in the header, like index level that is

    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
      || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

    // Sick cache reset stuff
    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      console.log(error);
      message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
    
	},
};