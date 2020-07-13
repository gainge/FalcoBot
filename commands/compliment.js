module.exports = {
	name: 'compliment',
	description: 'Say something nice about a user :)',
	execute(message, args) {
    if (!message.mentions.users) {
      message.channel.send('Please tag somebody to compliment');
    } else {
      // Create an array of compliments
      const compliments = message.mentions.users.map(mention => `${mention} is super cool!`);

      message.channel.send(compliments);
    }
	},
};