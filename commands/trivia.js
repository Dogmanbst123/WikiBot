const { SlashCommandBuilder } = require('discord.js');
const data = require('../data.json')
const ats = require('../functions.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('answer a trivia question'),
	async execute(interaction) {
        let allItems = (Object.keys(data))
        let item = allItems[Math.floor(Math.random()*allItems.length)]
        let restrictedItems = allItems.filter(element => data[element].type == data[item].type)
        console.log(restrictedItems)
        let itemEmbed = ats.embedConstructionTriviaImage(item, "Guess what DQ item the following image is:", '#f5f625')
        let row = ats.choices(item, restrictedItems[Math.floor(Math.random()*restrictedItems.length)], restrictedItems[Math.floor(Math.random()*restrictedItems.length)], restrictedItems[Math.floor(Math.random()*restrictedItems.length)])
        interaction.reply({embeds: [itemEmbed], components: [row]});
	},
    async buttonExecute (buttonClick){
        let choice = buttonClick.customId
        let componentsAll = buttonClick.message.components[0].components
        let answer;
        componentsAll.forEach(element => {
            if (element.data.custom_id == "correct") {
                element.data.style = 3
                element.data.disabled = true
                answer = element.data.label
            }
            else {element.data.style = 4
                element.data.disabled = true}
        })
        if (choice == 'correct') {
            let itemEmbed = ats.embedConstructionTriviaImage(answer, `Guess what DQ item the following image is: \n-----\n Your choice: ${buttonClick.component.label} \n Correct Answer: ${buttonClick.component.label} \n Status: Correct ✅`, '#00d26a')
            await buttonClick.update({content: "Correct!", embeds: [itemEmbed], components: [buttonClick.message.components[0]]});
        }
        else {
            let itemEmbed = ats.embedConstructionTriviaImage(answer, `Guess what DQ item the following image is: \n-----\n Your choice: ${buttonClick.component.label} \n Correct Answer: ${answer} \n Status: Incorrect ❌ `, '#f92f60')
            await buttonClick.update({embeds: [itemEmbed], components: [buttonClick.message.components[0]]});
        }
    },
};