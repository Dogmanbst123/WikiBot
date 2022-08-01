const { SlashCommandBuilder } = require('discord.js');

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
        async execute(interaction) {
            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle(ButtonStyle.Primary),
			);
		await interaction.reply({ content: 'Pong!', components: [row] });
        },
        async buttonExecute (buttonClick){
            await buttonClick.update({ content: 'A button was clicked!', components: [] });
        },
};