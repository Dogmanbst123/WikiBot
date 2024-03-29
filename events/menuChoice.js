module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;
        console.log(interaction.user.username)
        const command = interaction.client.commands.get(interaction.message.interaction.commandName);
        if (!command) return;
        try {
             await command.menuChoice(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};