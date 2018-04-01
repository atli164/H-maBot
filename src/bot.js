const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'token here';
const config = require('./config.json');
const module_dir = './modules/';
const exec_dir = './execs/';
const util_dir = './utils/';
var modules, execs, utils;
var commands = {};

bot.on('ready', () => {
    console.log('Ready for action!');
    bot.user.setPresence({
        game: {
            name: 'Being awesome'
        }
    });
    
    modules = getDirectories(module_dir);
    execs = getDirectories(exec_dir);
    utils = getDirectories(util_dir);

    // Load modules
    modules.forEach(cur_module => {
        var cur_module;
        try {
            cur_module = require(module_dir + modules[i]);
        } catch(err) {
            console.log('Failed to set up module ' + modules[i] + ' due to ' + err);
        }
        if(module) {
            if('commands' in module) {
                for(var j = 0; j < cur_module.commands.length; ++j) {
                    if(module.commands[j] in module) {
                        try {
                            commands[module.commands[j]] =  module[module.commands[j]];
                        } catch(err) {
                            console.log('Failed to set up command ' + module.commands[j] + ' due to ' + err);
                        }
                    }
                }
            }
        }
    });
});

bot.on('message', async message => {
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

bot.login(config.token);
