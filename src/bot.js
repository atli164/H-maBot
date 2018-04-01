const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'token here';

client.on('ready', () => {
    console.log('Ready for action!');
});

client.login('token');
