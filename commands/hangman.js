const { SlashCommandBuilder } = require('discord.js');
const data = require('../data.json');
const menuChoice = require('../events/menuChoice');
const ats = require('../functions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hangman')
		.setDescription('answer a trivia question'),
	async execute(interaction) {
        let allItems = (Object.keys(data))
        let item = allItems[Math.floor(Math.random()*allItems.length)]
        let word = item.split('')
        console.log(word)
            for (i = 0; i<word.length; i++) {
                if (word[i] != " " && word[i] != "'") {
                    word[i] = "?"
                }
            }
        let itemEmbed = ats.embedConstructionHangman(word.join(""), `Fill in the hangman, seen in the title above. Each ? represents 1 letter or character \n Incorrect Guesses:`, '#f5f625', "https://media.discordapp.net/attachments/649385621353267221/1083946708658040965/Drawing.png?width=422&height=422", `Last participant: ${interaction.user.tag}`)
        let menu = ats.Hangman(item)[0]
        let menu2 = ats.Hangman()[1]
        interaction.reply({embeds: [itemEmbed], components: [menu, menu2]});
	},
    async menuChoice (menuOption){
        let sprites =  ["https://media.discordapp.net/attachments/649385621353267221/1083946708658040965/Drawing.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946763188179065/Drawing_1.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946785141162056/Drawing_2.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946809719787600/Drawing_3.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946828883574834/Drawing_4.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946849263689818/Drawing_5.png?width=422&height=422", "https://media.discordapp.net/attachments/649385621353267221/1083946877164208190/Drawing_7.png?width=422&height=422"]
        let item = menuOption.message.components[0].components[0].data.custom_id
        let image = menuOption.message.embeds[0].data.thumbnail.url
        let currentProgress = menuOption.message.embeds[0].data.title
        let guess = menuOption.values[0]
        let itemArray = item.split('')
        let currentProgressArray = currentProgress.split('')
        let condition = true;
        let message = menuOption.message.embeds[0].data.description
        console.log(guess)
        for (i=0; i<itemArray.length; i++) {
            if (itemArray[i] == guess){
                currentProgressArray[i] = guess
                condition = false
            }
            if (itemArray[i] == guess.toUpperCase()){
                currentProgressArray[i] = guess.toUpperCase()
                condition = false
            }
        }
        if (condition) {
            message = message + " " + guess
            for (i = 0; i<sprites.length; i++) {
                if (sprites[i] == image) {
                    console.log("p")
                    image = sprites[i+1]
                    console.log(image)
                    break;
                }
            }
        }
        console.log(currentProgressArray)
        let menu = ats.Hangman(item)[0]
        let menu2 = ats.Hangman()[1]
        if (currentProgressArray.join("") == item) {
            message = message + "\n Status: Correct ✅"
            let itemEmbed = ats.embedConstructionHangman(currentProgressArray.join(""), message, '#00d26a', image, `Last participant: ${menuOption.user.tag}`)
            await menuOption.update({embeds: [itemEmbed], components: []});
        }
        else if (image == sprites[6]) {
            message = message + `\n Correct Answer: ${item} \n Status: Incorrect ❌`
            let itemEmbed = ats.embedConstructionHangman(currentProgressArray.join(""), message, '#f92f60', image, `Last participant: ${menuOption.user.tag}`)
            await menuOption.update({embeds: [itemEmbed], components: []});
        }
        else {
            let itemEmbed = ats.embedConstructionHangman(currentProgressArray.join(""), message, '#f5f625', image, `Last participant: ${menuOption.user.tag}`)
            await menuOption.update({embeds: [itemEmbed], components: [menu, menu2]});
        }
    },
};