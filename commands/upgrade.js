const { SlashCommandBuilder } = require('discord.js');
const ats = require('../functions.js')
module.exports = {
	data: new SlashCommandBuilder()
    .setName('upgradecalculate')
    .setDescription('Calculate the potential of your weapon & the upgrade cost.')
    .addIntegerOption(option => option.setName('power')
    .setRequired(true)
    .setDescription('The CURRENT power of your item'))
    .addIntegerOption(option => option.setName('currentupgrades')
    .setRequired(true)
    .setDescription('How many upgrades you\'ve already done'))
    .addIntegerOption(option => option.setName('totalupgrades')
    .setRequired(true)
    .setDescription('How many upgrades the item has in all')),
	async execute(interaction) {
        let power = interaction.options.getInteger('power') ?? -1;
        let currentUpgrades = interaction.options.getInteger('currentupgrades');
        let totalUpgrades = interaction.options.getInteger('totalupgrades');
        let cost = (ats.calculateUpgradeCost(currentUpgrades, totalUpgrades)).toLocaleString()
        if (power == -1) {
            text = `💰 Cost${cost} 💰`
        }
        else{
            let potential = power;
            let upgrades = currentUpgrades;
            while (potential < 200 && upgrades < totalUpgrades) {
                if (potential < 20) {
                    potential++;
                } else {
                    potential += Math.floor(potential / 20);
                }
                upgrades++;
            }
            potential += (totalUpgrades - upgrades) * 10;
            text = `💰Cost ${cost} 💰 \n ⚔️ Potential ${potential} ⚔️`
        }
        embed = ats.embedConstruction("Upgrade Calculation", text, '#f5f625')
        interaction.reply({embeds: [embed]}); 
    },
};