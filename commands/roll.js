module.exports = {
	name: 'roll',
  description: 'Rolls a random number from 1 to the provided max',
  args: true,
	execute(message, args) {
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      message.channel.send('Please input a number to roll');
    } else if (amount <= 1) {
      message.channel.send('Please input a positive number greater than 1 to roll');
    } else {
      // I guess let's try to roll it now, huh?
      const roll = Math.floor(Math.random() * Math.floor(amount)) + 1;

      message.channel.send(roll);
    }    
	},
};