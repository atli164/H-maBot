const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const module_dir = './modules/';
const exec_dir = './execs/';
const util_dir = './utils/';
var fs = require('fs');
var path = require('path');
var modules, execs, utils;
var commands = {};

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

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
        try {
            cur_module = require(module_dir + cur_module);
        } catch(err) {
            console.log('Failed to set up module ' + cur_module + ' due to ' + err);
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

function runCommand(cmd, args) {
    commands.forEach(cur_cmd => {
        // TODO
    });
}

bot.on('message', msg => {
    // Good rule of thumb to ignore message
    // from other bots (no anti-bot stuff pls)
    if(msg.author.bot) return;

    // Ignore messages not starting with prefix
    // which we set in the config file
    if(msg.content.indexOf(config.prefix) !== 0) return;

    // Split message into command and arguments
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift.toLowerCase();
});

bot.login(config.token);
