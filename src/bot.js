const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const module_dir = path.join(__dirname, 'modules/');
const exec_dir = path.join(__dirname, 'execs/');
const util_dir = path.join(__dirname, 'utils/');


const bot = new Discord.Client();
const modules = [];

const token = process.env[config.token_env_var_name];

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
      console.log('Failed to read files due to ' + err);
      throw err;
    }

    files.forEach(file => {
      try {

        let cur_module = require(path.join(module_dir, file));
        modules.push(cur_module);

      } catch (err) {
        console.log('Failed to set up module ' + file + ' due to ' + err);
      }
    });
  });

  // Load utils
  fs.readdir(util_dir, (err, files) => {
    if(err) {
      console.log('Failed to read files due to ' + err);
      throw err;
    }

    files.forEach(file => {
      try {
        let cur_util = require(path.join(util_dir, file));
      } catch(err) {
        console.log('Failed to set up util ' + file + ' due to ' + err);
      }
    });
  });
});

function execMsg(msg) {
  // Good rule of thumb to ignore message
  // from other bots (no anti-bot stuff pls)
  if (msg.author.bot) return;

  // Ignore messages not starting with prefix
  // which we set in the config file
  if (!msg.content.startsWith(config.prefix)) return;

  // Split message into command and arguments
  const msg_content = msg.content.slice(config.prefix.length);
  const cmd_name = msg_content.split(/ +/)[0];
  const args = msg_content.split(/ +/).slice(1);

  // See if we have any commands matching whatever we just recieved.
  // If we do, execute them.
  modules.forEach(mod => {
    mod.commands
      .filter(cmd => { return cmd_name.match(cmd.test); })
      .forEach(cmd => { cmd.process(bot, msg, args); });
  });
}

bot.on('message', message => {
  execMsg(message);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
  execMsg(newMessage);
});

bot.login(token).then(
  () => {/* resolved callback*/ },
  err => {
    console.log('Failed to log in with ' + err);
  }
);
