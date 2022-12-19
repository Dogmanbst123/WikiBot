const { SlashCommandBuilder } = require('discord.js');
const data = require('../data.json')
const ats = require('../functions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('answer a trivia question')
        .addStringOption(option => option.setName('difficulty')
        .setDescription('The difficulty you want')
        .addChoices(
            { name: 'Easy', value: 'easy' },
            { name: 'Medium', value: 'medium' },
        )),
	async execute(interaction) {
        let difficulty = interaction.options.getString('difficulty');
        if (!difficulty) {
            difficulty = ["easy", "medium"][Math.floor(Math.random()*2)]
        }
        let allItems = (Object.keys(data))
        let item = allItems[Math.floor(Math.random()*allItems.length)]
        if (difficulty == 'medium'){
            let itemEmbed = ats.embedConstructionTriviaImage(item, `What level requirement does ${item} have`, '#f5f625', "Find the level req - Medium")
            let row = ats.choicesLevelReq((data[item].levelReq).toString(), item)
            interaction.reply({content: item, embeds: [itemEmbed], components: [row]});
        }
        else {
        let restrictedItems = allItems.filter(element => data[element].type == data[item].type)
        let itemEmbed = ats.embedConstructionTriviaImage(item, "Guess what DQ item the following image is:", '#f5f625', "Guess the Item - Easy")
        let row = ats.choices(item, restrictedItems[Math.floor(Math.random()*restrictedItems.length)], restrictedItems[Math.floor(Math.random()*restrictedItems.length)], restrictedItems[Math.floor(Math.random()*restrictedItems.length)])
        interaction.reply({embeds: [itemEmbed], components: [row]})};
	},
    async buttonExecute (buttonClick){
        let componentsAll = buttonClick.message.components[0].components
        let description = buttonClick.message.embeds[0].description
        let title = buttonClick.message.embeds[0].title
        let answer;
        let item;
        componentsAll.forEach(element => {
            if (element.data.custom_id == "correct") {
                element.data.style = 3
                element.data.disabled = true
                answer = element.data.label
                item = element.data.label
            }
            else if (element.data.label == buttonClick.component.label) {
                element.data.style = 4
                element.data.disabled = true
            }
            else {element.data.style = 2
                element.data.disabled = true}
        })
        if (Number(answer))
            item = buttonClick.message.content
        if (buttonClick.component.label == answer) {
            let itemEmbed = ats.embedConstructionTriviaImage(item, `${description} \n-----\n Your choice: ${buttonClick.component.label} \n Correct Answer: ${buttonClick.component.label} \n Status: Correct ✅`, '#00d26a', title)
            await buttonClick.update({content: "Correct!", embeds: [itemEmbed], components: [buttonClick.message.components[0]]});
        }
        else {
            let itemEmbed = ats.embedConstructionTriviaImage(item, `${description} \n-----\n Your choice: ${buttonClick.component.label} \n Correct Answer: ${answer} \n Status: Incorrect ❌ `, '#f92f60', title)
            await buttonClick.update({content: "Incorrect!", embeds: [itemEmbed], components: [buttonClick.message.components[0]]});
        }
    },
};