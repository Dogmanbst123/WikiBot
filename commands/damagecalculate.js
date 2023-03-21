const { SlashCommandBuilder } = require('discord.js');
const ats = require('../functions.js')
module.exports = {
	data: new SlashCommandBuilder()
    .setName('damagecalculate')
    .setDescription('Calculate the damage your character does')
    .addIntegerOption(option => option.setName('helmet')
    .setRequired(true)
    .setDescription('The power of your helmet'))
    .addIntegerOption(option => option.setName('armor')
    .setRequired(true)
    .setDescription('The power of your armor'))
    .addIntegerOption(option => option.setName('weapon')
    .setRequired(true)
    .setDescription('The power of your weapon'))
    .addIntegerOption(option => option.setName('skill')
    .setRequired(true)
    .setDescription('The amount of skill points'))
    .addStringOption(option => option.setName('ability')
    .setDescription('Your ability/spell')
    .addChoices(
        { name: "Blade Barrage / God Spear / Amethyst Beams / Jade Rain", value: "133" },
        { name: "Jade Roller", value: "126" },
        { name: "Solar Beam (2 ticks)", value: "63" },
        { name: "Flame Shuriken / Geyser", value: "119" },
        { name: "Gale Barrage (3 ticks)", value: "39.667" },
        { name: "Soul Drain (6 ticks)", value: "39.667" },
        { name: "Frost Cone / Flame Strike", value: "112" },
        { name: "Wind Blast / Crystalline Cannon / Lightning Burst / Agony Orbs", value: "107" },
        { name: "Piercing Roots", value: "100" },
        { name: "Fungal Poison (6 ticks)", value: "16.667" },
        { name: "Ice Crash / Ice Barrage / Aquatic Smite / Ice Spikes", value: "92" },
        { name: "Spear Strike / Water Orb", value: "86" }
    )),
	async execute(interaction) {
        let helm = interaction.options.getInteger('helmet');
        let arm = interaction.options.getInteger('armor');
        let wep = interaction.options.getInteger('weapon');
        let skill = interaction.options.getInteger('skill');
        let ability = interaction.options.getString('ability') ?? 133
        let dmg = Math.floor(wep * (0.6597 + 0.013202 * skill) * (arm + helm) * 0.0028 * ability)
        var low = dmg * 0.95;
        var high = dmg * 1.05;

        var lowInner = dmg * 1.8 * 0.95;
        var baseInner = dmg * 1.8;
        var highInner = dmg * 1.8 * 1.05;

        var lowEInner = dmg * 1.9 * 0.95;
        var baseEInner = dmg * 1.9;
        var highEInner = dmg * 1.9 * 1.05;

        var lowDamage = ats.truncate(low);
        var baseDamage = ats.truncate(dmg);
        var highDamage = ats.truncate(high);

        var lowInnerDamage = ats.truncate(lowInner);
        var baseInnerDamage = ats.truncate(baseInner);
        var highInnerDamage = ats.truncate(highInner);

        var lowEInnerDamage = ats.truncate(lowEInner);
        var baseEInnerDamage = ats.truncate(baseEInner);
        var highEInnerDamage = ats.truncate(highEInner);
        let p2 = "❌ No Inner  \n" +
        "Low Damage  " + lowDamage + "\n" +
        "Average: " + baseDamage + "\n" +
        "High Damage: " + highDamage + "\n\n" +

        "🟣 With Inner  \n" +
        "Low Damage: " + lowInnerDamage + "\n" +
        "Average: " + baseInnerDamage + "\n" +
        "High Damage: " + highInnerDamage + "\n\n" +

        "🟠 With Enhanced Inner  \n " +
        "Low Damage: " + lowEInnerDamage + "\n" +
        "Average: " + baseEInnerDamage + "\n" +
        "High Damage: " + highEInnerDamage + "\n\n" 
        embed = ats.embedConstruction("Damage Calculation", `🪖 Helmet Power: ${helm.toLocaleString()} \n🛡️ Armor Power: ${arm.toLocaleString()} \n ⚔️ Weapon Power: ${wep.toLocaleString()} \n 🆙 Skill Points: ${skill.toLocaleString()} \n ============= \n 🔥 DAMAGE OUTPUT 🔥\n ${p2}`, '#f5f625')
        interaction.reply({embeds: [embed]}); 
    },
};