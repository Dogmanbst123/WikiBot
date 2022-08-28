const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('do not use this command'),
	async execute(interaction) {
            let guilds = interaction.client.guilds.cache
            console.log(guilds)
            interaction.reply('logged');
	},
};