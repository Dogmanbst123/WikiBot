const ats = require('../functions.js')
module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.bot) return;
		if (message.channel.id == '1013242881105993808' || message.channel.id == '1013248540425867394' ) {
			const listOfChannels = ['1013242881105993808', '1013248540425867394']
			listOfChannels.forEach(id => message.client.channels.cache.get(id).send({ embeds: [ats.embedConstructionMessage(message)] }))
			message.delete().catch(console.error);
		}
		else return;
	},
};