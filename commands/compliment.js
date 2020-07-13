const phrases = [
  'is super cool!',
  'has great fashion sense',
  'has a great playstyle',
  'has the best combos',
  'is always really nice!',
];

const randomCompliment = () => {
  return phrases[Math.floor(Math.random() * phrases.length)];
};

module.exports = {
	name: 'compliment',
	description: 'Say something nice about a user :)',
	execute(message, args) {
    if (!message.mentions.users) {
      message.channel.send('Please tag somebody to compliment');
    } else {
      // Create an array of compliments
      const compliments = message.mentions.users.map(mention => `${mention} ${randomCompliment()}`);

      message.channel.send(compliments);
    }
	},
};