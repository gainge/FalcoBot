const reads = [
  'roll in',
  'roll away',
  'tech in place',
  'missed tech',
  'jump',
  'recover high',
  'firefox to ledge',
  'run-up upsmash',
  'instant side b',
  'shieldgrab',
  'jump out of hitstun',
];

const randomRead = () => {
  return reads[Math.floor(Math.random() * reads.length)];
};

module.exports = {
	name: 'read',
	description: 'Falco makes a sick read',
	execute(message, args) {
    message.channel.send(`Falco ${Math.random() > 0.2 ? 'hard ' : ''}reads ${randomRead()}`);
	},
};