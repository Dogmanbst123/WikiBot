const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('do not use this command'),
	async execute(interaction) {
		if (interaction.member == 482685415019642880) {
            let guilds = interaction.client.guilds.cache
            console.log(guilds)
            interaction.reply('logged');
        }
        else {
            interaction.reply('I told you not to use it you sussy boy!');
        }
	},
};