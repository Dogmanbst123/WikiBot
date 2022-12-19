const { SlashCommandBuilder } = require('discord.js');
const data = require('../data.json')
const ats = require('../functions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('wikibutton')
		.setDescription('Get wiki info')
		.addStringOption(option => option.setName('item')
        .setRequired(true)
        .setDescription('The item you want info on. (Ex: Riptide Guardian Helmet) [Check actual wiki for Boss Raids]')),
	async execute(interaction) {
		let itemRaw = interaction.options.getString('item');
        let item = ats.capitalizeFirstLetter(itemRaw)
        let isEphemeral = false 
        if (!data.hasOwnProperty(`${item}`)){
            item = (ats.autoCorrect(item))
            isEphemeral = true
        }
        console.log(item)
		if (data.hasOwnProperty(`${item}`)){
			let dog = data[`${item}`]
                    if (dog.ultimate) {
                        let tier1;
                        if (dog.tierr.minDamage) {tier1 = `🔴 ${item} Stats:\n⚔️ Physical Power: ${dog.tierr.damage.toLocaleString()}\n☮️ Min Physical Power: ${dog.tierr.minDamage.toLocaleString()}\n🪄 Spell Power: ${dog.tierr.spellPower.toLocaleString()}\n⬆️ Upgrades: ${dog.tierr.maxUpgrades.toLocaleString()}\n⬇️ Min Upgrades: ${dog.tierr.minMaxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`}
                        else {tier1 = tier1 = `🔴 ${item} Stats:\n⚔️ Physical Power: ${dog.tierr.damage.toLocaleString()}\n🪄 Spell Power: ${dog.tierr.spellPower.toLocaleString()}\n☮️ Min Spell Power: ${dog.tierr.minSpellPower.toLocaleString()}\n⬆️ Upgrades: ${dog.tierr.maxUpgrades.toLocaleString()}\n⬇️ Min Upgrades: ${dog.tierr.minMaxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`}
                        const itemEmbed = ats.embedConstructionSimple(item, tier1)
                        interaction.reply({content: `${item}`, embeds: [itemEmbed], ephemeral: isEphemeral});
                    }
                    else if (dog.unique) {
                        const tier1 = `🟠 ${item} Stats:\n⚔️ Physical Power: ${dog.uniqueTier.damage.toLocaleString()}\n🪄 Spell Power: ${dog.uniqueTier.spellPower.toLocaleString()}\n⬆️ Upgrades: ${dog.uniqueTier.maxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`
						const itemEmbed = ats.embedConstructionSimple(item, tier1)
                        interaction.reply({content: `${item}`, embeds: [itemEmbed], ephemeral: isEphemeral});
                    }
					else if (dog.type == 'helmet'||dog.type == 'chest') {
						const tier1 = `⚫ Gray Rarity Stats:\n❤️ Health: ${dog.tier1.health.toLocaleString()}\n⚔️ Physical Power: ${dog.tier1.physicalPower.toLocaleString()}\n🪄 Spell Power: ${dog.tier1.spellPower.toLocaleString()}\n⬆️ Upgrades: ${dog.tier1.maxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`
						const itemEmbed = ats.embedConstructionArmor(item, tier1)
                        const row = ats.row;
                        interaction.reply({content: `${item}`, embeds: [itemEmbed], components: [row], ephemeral: isEphemeral});
					}
                    else if (dog.type == 'weapon') {
						const tier1 = `⚫ Gray Rarity Stats:\n⚔️ Physical Power: ${dog.tier1.damage.toLocaleString()}\n🪄 Spell Power: ${dog.tier1.spellPower.toLocaleString()}\n⬆️ Upgrades: ${dog.tier1.maxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`
						const itemEmbed = ats.embedConstructionSimple(item, tier1)
                        const row = ats.row;
                        interaction.reply({content: `${item}`, embeds: [itemEmbed], components: [row], ephemeral: isEphemeral});
					}
                    else if (dog.type == 'ability') {
						const tier1 = `Description: ${dog.description}\nRarity: ${dog.rarity}\nSell Price: ${(dog.sellPrice).toLocaleString()}\nLevel Req: ${(dog.levelReq).toLocaleString()}`
						const itemEmbed = ats.embedConstructionSimple(item, tier1);
                        interaction.reply({content: `${item}`, embeds: [itemEmbed], ephemeral: isEphemeral});
					}
        }
		else return interaction.reply(`That's not a valid item (weapon/armor/spell)`);
	},
    async buttonExecute (buttonClick){
        let item = buttonClick.message.content
        let dog = data[`${item}`]
        let color = ats.color(`${buttonClick.customId}`);
        let itemEmbed;
            if (dog.type == 'helmet'||dog.type == 'chest') {
                const info = `${color} Rarity Stats:\n❤️ Health: ${(dog[`${buttonClick.customId}`].health).toLocaleString()}\n⚔️ Physical Power: ${(dog[`${buttonClick.customId}`].physicalPower).toLocaleString()}\n🪄 Spell Power: ${(dog[`${buttonClick.customId}`].spellPower).toLocaleString()}\n⬆️ Upgrades: ${(dog[`${buttonClick.customId}`].maxUpgrades).toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`
                itemEmbed = ats.embedConstructionArmor(item, info)
            }
        else if (dog.type == 'weapon'){
                const info = `${color} Rarity Stats:\n⚔️ Physical Power: ${dog[`${buttonClick.customId}`].damage.toLocaleString()}\n🪄 Spell Power: ${dog[`${buttonClick.customId}`].spellPower.toLocaleString()}\n⬆️ Upgrades: ${dog[`${buttonClick.customId}`].maxUpgrades.toLocaleString()}\n🪙 Sell Price: ${(dog.sellPrice).toLocaleString()}\n✅ Level Req: ${(dog.levelReq).toLocaleString()}`
                 itemEmbed = ats.embedConstructionSimple(item, info)
                }
        await buttonClick.update({embeds: [itemEmbed]});
    },
};