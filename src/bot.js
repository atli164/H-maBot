const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'token here';
const config = require('./config.json');

client.on('ready', () => {
    console.log('Ready for action!');
});

client.on('message', async message => {
    // Good rule of thumb to ignore message
    // from other bots (no anti-bot stuff pls)
    if(message.author.bot) return;

    // Ignore messages not starting with prefix
    // which we set in the config file
    if(message.content.indexOf(config.prefix) !== 0) return;

    // Split message into command and arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift.toLowerCase();
});

client.login(config.token);
