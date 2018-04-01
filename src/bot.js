const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const module_dir = './modules/';
const exec_dir = './execs/';
const util_dir = './utils/';
var fs = require('fs');
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
  fs.readdir(module_dir, (err, files) => {
    if(err) {
      console.log('Failed to read file due to ' + err);
    }
    files.forEach(file => {
      var cur_module;
      try {
        cur_module = require(module_dir + file);
      } catch(err) {
        console.log('Failed to set up module ' + file + ' due to ' + err);
      }
      if(cur_module) {
        if('commands' in cur_module) {
          cur_module.commands.forEach(cmd => {
            if(cur_module[cmd]) {
              try {
                commands[cmd] = cur_module[cmd];
              } catch(err) {
                console.log('Failed to set up command ' + cmd + ' due to ' + err);
              }
            }
          });
        }
      }
    });
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
