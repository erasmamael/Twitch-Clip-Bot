const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Commands list'),
    /**
     * 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {
        await interaction.reply('commande : fait ... '); 
    }
        
}