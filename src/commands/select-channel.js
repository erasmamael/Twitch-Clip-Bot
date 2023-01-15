const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const TwitchApi = require('node-twitch').default;
const { twitchClientId, twitchClientSecret } = require('../config.json');

const twitch = new TwitchApi({
    client_id: twitchClientId,
    client_secret: twitchClientSecret
});

async function getUserId(loginName){
    const users = await twitch.getUsers(loginName);
    return users.data[0].id;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select-channel')
        .setDescription('Set a channel for twitch clips : /select-channel [#channel] [twitch-name]')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('Channel for clips')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('twitch-name')
                .setDescription('Name of the twitch account')
                .setRequired(true)),
/**
     * 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const loginName = interaction.options.getString('twitch-name');

        if ( getUserId(loginName) != null){

            let lastIdClip;

            async function getClip(loginName, date){
                
                getUserId(loginName).then( async (result) => {
                    const clips = await twitch.getClips({ broadcaster_id: result  , started_at: date });

                    if (clips.data[0] != null){
                        if ( lastIdClip !== clips.data[0].id || lastIdClip == null){
                            
                            channel.send(clips.data[0].url);

                            lastIdClip = clips.data[0].id;
                        }
                        
                    }
                });
            }

            interaction.reply(`Channel : ${channel} \nTwitch account : ${loginName}`);
            
            
            
            while (true){

                let date = new Date();

                let formatted = date.toISOString();
                console.log(formatted);

                getClip(loginName, formatted);

                await new Promise(r => setTimeout(r, 60000));
            }

        }
    }
};