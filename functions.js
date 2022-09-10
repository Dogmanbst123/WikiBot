const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const data = require('./data.json')
const autocorrect = require('autocorrect')({words: Object.keys(data)});
const badwords = ["heck", "nigger", "bitch", "cum", "dick", "d1ck", " ass ", "fuck", "b1tch", "asshat", "asshole", "shit", " ass", "sh1t"]
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
        .setFooter({text: `User ID: ${message.author.id}`})
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
        .setFooter({text: `User ID: ${message.author.id}`})
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
        .setFooter({text: `User ID: ${message.author.id}`})
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
)
}