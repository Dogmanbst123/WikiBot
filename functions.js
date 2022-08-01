const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const data = require('./data.json')
const datawithlinks = require('./datawithlinks.json')
const autocorrect = require('autocorrect')({words: Object.keys(data)});
module.exports = {
embedConstruction: function (item, message) {
    const regex = / /gi
    const urlthing = item.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}`)
	.setDescription(`${message}`)
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
embedConstructionWeapon: function (item, field1, field2, field3, field4, field5) {
    const regex = / /gi
    const urlthing = item.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}`)
    .addFields(
		{ name: 'Common', value: `${field1}`, inline: true },
		{ name: 'Uncommon', value: `${field2}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Rare', value: `${field3}`, inline: true },
		{ name: 'Epic', value: `${field4}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'All', value:`${field5}`, inline: true}
	)
    .setThumbnail('https://static.wikia.nocookie.net/dungeonquestroblox/images/e/e6/Site-logo.png/')
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
embedConstructionSpell: function (item, field1, field2, field3, field4, field5) {
    const regex = / /gi
    const lastWord = item.lastIndexOf(" ");
    const set = item.substring(0, lastWord);
    const urlthing = set.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}_Set`)
    .addFields(
		{ name: 'Common', value: `${field1}`, inline: true },
		{ name: 'Uncommon', value: `${field2}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Rare', value: `${field3}`, inline: true },
		{ name: 'Epic', value: `${field4}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'All', value:`${field5}`, inline: true}
	)
    .setThumbnail('https://static.wikia.nocookie.net/dungeonquestroblox/images/e/e6/Site-logo.png/')
	.setTimestamp()
	.setFooter({ text: 'DQ Wiki Bot',});
    return exampleEmbed
},
embedConstructionSimple: function (item, description) {
    const regex = / /gi
    const urlthing = item.replace(regex,'_')
    const exampleEmbed = new EmbedBuilder()
	.setColor('#f5f625')
	.setTitle(item)
	.setURL(`https://dungeonquestroblox.fandom.com/wiki/${urlthing}`)
    .setDescription(`${description}`)
    .setThumbnail (datawithlinks[item].imagelink)
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
    .setThumbnail (datawithlinks[item].imagelink)
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