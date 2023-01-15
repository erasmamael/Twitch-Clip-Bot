const { Client, CommandInteraction } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
const handleCommand = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try  {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Une erreur est survenue lors de l'execution de cette commande.", ephemeral: true});
    }
}

module.exports = handleCommand;


