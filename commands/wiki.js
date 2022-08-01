const { SlashCommandBuilder } = require('discord.js');
const data = require('../data.json')
const ats = require('../functions.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const autocorrect = require('autocorrect')()
module.exports = {
	data: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Get wiki info')
		.addStringOption(option => option.setName('target').setDescription('The item (weapon/armor/spell) you want info on. (Ex: Riptide Guardian Helmet')),
	async execute(interaction) {
		const item = interaction.options.getString('target');	
		if (data.hasOwnProperty(`${item}`)){
			let dog = data[`${item}`]
					if (dog.type == 'helmet'||dog.type == 'chest') {
						const tier1 = `Health: ${dog.tier1.health}\nPhysical Power: ${dog.tier1.physicalPower}\nSpell Power: ${dog.tier1.spellPower}\nMax Upgrades: ${dog.tier1.maxUpgrades}`
						const tier2 = `Health: ${dog.tier2.health}\nPhysical Power: ${dog.tier2.physicalPower}\nSpell Power: ${dog.tier2.spellPower}\nMax Upgrades: ${dog.tier2.maxUpgrades}`
						const tier3 = `Health: ${dog.tier3.health}\nPhysical Power: ${dog.tier3.physicalPower}\nSpell Power: ${dog.tier3.spellPower}\nMax Upgrades: ${dog.tier3.maxUpgrades}`
						const tier4 = `Health: ${dog.tier4.health}\nPhysical Power: ${dog.tier4.physicalPower}\nSpell Power: ${dog.tier4.spellPower}\nMax Upgrades: ${dog.tier4.maxUpgrades}`
						const tier5 = `Sell Price: ${dog.sellPrice}\nLevel Req: ${dog.levelReq}`
						const itemEmbed = ats.embedConstructionArmor(item, tier1, tier2, tier3, tier4, tier5)
						interaction.reply({ embeds: [itemEmbed] });
					}
					else if (dog.type == 'weapon'){
                        const tier1 = `Physical Power: ${dog.tier1.damage}\nSpell Power: ${dog.tier1.spellPower}\nMax Upgrades: ${dog.tier1.maxUpgrades}`
                        const tier2 = `Physical Power: ${dog.tier2.damage}\nSpell Power: ${dog.tier2.spellPower}\nMax Upgrades: ${dog.tier2.maxUpgrades}`
                        const tier3 = `Physical Power: ${dog.tier3.damage}\nSpell Power: ${dog.tier3.spellPower}\nMax Upgrades: ${dog.tier3.maxUpgrades}`
                        const tier4 = `Physical Power: ${dog.tier4.damage}\nSpell Power: ${dog.tier4.spellPower}\nMax Upgrades: ${dog.tier4.maxUpgrades}`
                        const tier5 = `Sell Price: ${dog.sellPrice}\nLevel Req: ${dog.levelReq}`
                        const itemEmbed = ats.embedConstruction2(item, tier1, tier2, tier3, tier4, tier5)
                        interaction.reply({embeds: [itemEmbed] });
                    }
					else if (dog.type == 'spell'){
                        const itemEmbed = ats.embedConstruction2(item, tier1, tier2, tier3, tier4, tier5)
                        interaction.reply({embeds: [itemEmbed] });
                    }
					else return interaction.reply('sussy baka');
        }
		else return interaction.reply(`That's not a valid item (weapon/armor/spell)`);
	},
};
