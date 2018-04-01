const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const module_dir = './modules/';
const exec_dir = './execs/';
const util_dir = './utils/';

const bot = new Discord.Client();
var commands = [];

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

  const modules = getDirectories(module_dir);
  const execs = getDirectories(exec_dir);
  const utils = getDirectories(util_dir);

  // Load modules
  modules.forEach(cur_module => {
    try {
      cur_module = require(module_dir + cur_module);
      commands.append(cur_module.commands);
    } catch (err) {
      console.log('Failed to set up module ' + cur_module + ' due to ' + err);
    }
  });
});

bot.on('message', msg => {
  // Good rule of thumb to ignore message
  // from other bots (no anti-bot stuff pls)
  if (msg.author.bot) return;

  // Ignore messages not starting with prefix
  // which we set in the config file
  if (msg.content.startsWith(config.prefix)) return;

  // Split message into command and arguments
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd_name = args.shift().toLowerCase();

  // See if we have any commands matching whatever we just recieved.
  // If we do, execute them.
  commands
    .filter(cmd => { return cmd_name.match(cmd.test); })
    .forEach(cmd => { cmd.process(bot, msg, args); });
});

bot.login(config.token);
