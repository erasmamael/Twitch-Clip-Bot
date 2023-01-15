//const { roleMention } = require('@discordjs/builders');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require( './config.json' );

const handleComand = require('./helpers/command');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });



client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}


client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) handleComand(client, interaction);

    
});


client.login(token); 
