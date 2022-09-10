const ats = require('../functions.js')
module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		if (message.channel.id == '1013242881105993808' || message.channel.id == '1013248540425867394' || message.channel.id == '1013616672277544980') {
			let channel = await message.client.channels.cache.get('1018239456463032392')
            let message2 = await channel.messages.fetch('1018239474498535565')
			let listOfBannedUsers = message2.content.split(" ")
			if (ats.checkIfBanned(message.author.id, listOfBannedUsers)) return;
			if (ats.checkIfBadWord(message.content)) {
				message.client.channels.cache.get('1016139720473989120').send({ content:"user tried to send", embeds: [ats.embedConstructionMessage(message)] })
			}
			else {
			const listOfChannels = ['1013242881105993808', '1001699449590009917']
			listOfChannels.forEach(id => message.client.channels.cache.get(id).send({ embeds: [ats.embedConstructionMessage(message)] }))
			message.delete().catch(console.error)
			}
		}
		else return;
	},
};