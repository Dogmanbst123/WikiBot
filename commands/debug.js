const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('do not use this command'),
	async execute(interaction) {
            interaction.reply('nothing');
	},
};