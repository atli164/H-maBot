const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const module_dir = './modules/';
const exec_dir = './execs/';
const util_dir = './utils/';

const bot = new Discord.Client();
var commands = [];

bot.on('ready', () => {
  console.log('Ready for action!');
  bot.user.setPresence({
    game: {
      name: 'Being awesome'
    }
  });

  // Load modules
  fs.readdir(module_dir, (err, files) => {
    if (err) {
      console.log('Failed to read file due to ' + err);
    }
    files.forEach(file => {
      var cur_module;
      try {
        cur_module = require(module_dir + file);
      } catch (err) {
        console.log('Failed to set up module ' + file + ' due to ' + err);
      }
      if (cur_module) {
        if ('commands' in cur_module) {
          cur_module.commands.forEach(cmd => {
            if (cur_module[cmd]) {
              try {
                commands.push(cur_module[cmd]);
              } catch (err) {
                console.log('Failed to set up command ' + cmd + ' due to ' + err);
              }
            }
          });
        }
      }
    });
  });
});

bot.on('message', msg => {
  // Good rule of thumb to ignore message
  // from other bots (no anti-bot stuff pls)
  if (msg.author.bot) return;

  // Ignore messages not starting with prefix
  // which we set in the config file
  if (!msg.content.startsWith(config.prefix)) return;

  // Split message into command and arguments
  const msg_content = msg.content.slice(config.prefix.length);
  const args = msg_content.substr(0, msg_content.indexOf(' '));
  const cmd_name = msg_content.substr(msg_content.indexOf(' ') + 1);

  // See if we have any commands matching whatever we just recieved.
  // If we do, execute them.
  commands
    .filter(cmd => { return cmd_name.match(cmd.test); })
    .forEach(cmd => { cmd.process(bot, msg, args); });
});

bot.login(config.token);
