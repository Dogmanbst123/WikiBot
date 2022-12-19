const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const data = require('./data.json')
const autocorrect = require('autocorrect')({words: Object.keys(data)});
const badwords = ["heck", "nigger", "bitch", "cum", "dick", "d1ck", " ass ", "fuck", "b1tch", "asshat", "asshole"]
module.exports = {
checkIfBadWord: function (message) {
    for (let i=0; i<badwords.length; i++) {
        let pattern = new RegExp(`${badwords[i]}`)
        if (pattern.test(message)) {
            return true;
        }
    }
    return false;
},
checkIfBanned: function (user, array) {
    for (let i=0; i<array.length; i++) {
        let element = array[i]
        if (element == user) return true;
    }
    return false;
},
embedConstructionMessage: function (message) {
    if (message.attachments.size == 0 && message.stickers.size == 0) {
        const exampleEmbed = new EmbedBuilder()
        .setAuthor({ name: `${message.author.tag} from ${message.guild}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${message.content}`)
        .setImage()
        .setColor(Number(`${message.guild.id.substring(0,7)}`))
        return exampleEmbed
    }
    else if (message.attachments.size >= 1) {
        console.log(message.attachments.size)
        let description = ' ';
        if (message.content) {
            description = message.content
        }
        const exampleEmbed = new EmbedBuilder()
        .setAuthor({ name: `${message.author.tag} from ${message.guild}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${description}`)
        .setImage(message.attachments.values().next().value.url)
        .setColor(Number(`${message.guild.id.substring(0,7)}`))
        return exampleEmbed
    }
    else if (message.stickers.size >= 1) {
        description = " "
        console.log(message.attachments.size)
        const exampleEmbed = new EmbedBuilder()
        .setAuthor({ name: `${message.author.tag} from ${message.guild}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${description}`)
        .setImage(message.stickers.values().next().value.url)
        .setColor(Number(`${message.guild.id.substring(0,7)}`))
        return exampleEmbed
    }
},
embedConstructionSimple: function (item, description) {
    const regex = / /gi
    const urlthing = item.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}`)
    .setDescription(`${description}`)
    .setThumbnail (data[item].imagelink)
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
embedConstructionTriviaImage: function (item, description, color, title) {
    const exampleEmbed = new EmbedBuilder()
	.setColor(color)
	.setTitle(title)
    .setDescription(`${description}`)
    .setThumbnail (data[item].imagelink)
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
capitalizeFirstLetter: function (string){
    let words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
     words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
   }
   const item = words.join(" ");
   return item
}, 
toColor(num) {
    num >>>= 0;
    const b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16 ;
    return [r, g, b];
},
embedConstructionArmor: function (item, description) {
    const regex = / /gi
    const lastWord = item.lastIndexOf(" ");
    const set = item.substring(0, lastWord);
    const urlthing = set.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}_Set`)
    .setDescription(`${description}`)
    .setThumbnail (data[item].imagelink)
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
color: function (expression) {
    let color; 
    switch (expression) {
        case 'tier1':
            color = '⚫ Gray'
            break;
        case 'tier2':
            color = '🟢 Green'
            break;
        case 'tier3':
            color = '🔵 Blue'
            break;
        case 'tier4':
            color = '🟣 Purple'
    }
    return color;
},
randomtier: function (){
    let tiers = ['tier1', 'tier2', 'tier3', 'tier4'];
    return tiers[Math.floor(Math.random()*tiers.length)];
},
autoCorrect: function (string) {
    let dictionary = Object.keys(data);
    let words = (string.split(" ")).join('');
    const item= autocorrect(words)
   return item
},
row: new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('tier1')
        .setLabel('Gray')
        .setEmoji('⚫')
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId('tier2')
        .setLabel('Green')
        .setEmoji('🟢')
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId('tier3')
        .setLabel('Blue')
        .setEmoji('🔵')
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId('tier4')
        .setLabel('Purple')
        .setEmoji('🟣')
        .setStyle(ButtonStyle.Secondary),
),
choices: function (correctanswer, option1, option2, option3) {
    let array = [[correctanswer, 'correct'],[option1, 'option1'],[option2, 'option2'],[option3, 'option3']]
    function dog () {
        let index = Math.floor(Math.random()*array.length)
        return array.splice(index, 1)
    }
    let [choice1, choice2, choice3, choice4] = [dog()[0], dog()[0], dog()[0], dog()[0]]
return new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId(choice1[1])
        .setLabel(choice1[0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(choice2[1])
        .setLabel(choice2[0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(choice3[1])
        .setLabel(choice3[0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(choice4[1])
        .setLabel(choice4[0])
        .setStyle(ButtonStyle.Secondary),
)},
choicesLevelReq: function (num, item) {
    let position = Math.floor(Math.random() * 4)
    let pos = position
    num = Number(num)
    let numbers = [];
    for (let i=0; i < position + 1; i++){
        numbers[position-i] = [(num - i*5).toString(), (num - i*5).toString()]
    }
    let j = 1
    while (pos < 3){
        pos = pos + 1
        j = j + 1
        numbers[pos] = [(num + j*5).toString(), (num + j*5).toString()]
    }
    numbers[position] = [num.toString(), "correct"]
return new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId(numbers[0][1])
        .setLabel(numbers[0][0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(numbers[1][1])
        .setLabel(numbers[1][0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(numbers[2][1])
        .setLabel(numbers[2][0])
        .setStyle(ButtonStyle.Secondary),
)
.addComponents(
    new ButtonBuilder()
        .setCustomId(numbers[3][1])
        .setLabel(numbers[3][0])
        .setStyle(ButtonStyle.Secondary),
)},
}