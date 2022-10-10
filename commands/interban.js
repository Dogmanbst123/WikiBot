const ats = require('../functions.js')
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('interban')
    .setDescription('Ban a user from the interguild-chat')
    .addStringOption(option => option.setName('userid')
    .setRequired(true)
    .setDescription('target userid')),
	async execute(interaction) {
        let userid = interaction.options.getString('userid');
        let regex = /[0-9]+/
        let mods = ['482685415019642880', '127956423790428160']
        if (!ats.checkIfBanned(interaction.member.id, mods)) {
            interaction.reply("you are not an interguild mod")
        }
        if (regex.test(userid)){   
            let channel = await interaction.client.channels.cache.get('1028895304218595430')
            let message = await channel.messages.fetch('1028896111705997353')
            message.edit(message.content + " " + userid)
            interaction.reply("ok banned the sussy lil baka")
        }
        else {
            interaction.reply("not a valid userid")
        }
	},
};