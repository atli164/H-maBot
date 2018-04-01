const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();

const module_dir = "./modules/";
const exec_dir = "./execs/";
const util_dir = "./utils/";

var modules, execs, utils;

const token = process.env.HAMABOT_TOKEN; // Fetch token from environment variable.

bot.on("ready", () => {
  console.log("Ready for action!");
  bot.user.setPresence({
    game: {
      name: "Being awesome."
    }
  });

  modules = getDirectories(module_dir);
  execs = getDirectories(exec_dir);
  utils = getDirectories(util_dir);

  // Load modules
  for (var i = 0; i < modules.length; ++i) {
    var cur_module;
    try {
      cur_module = require(module_dir + modules[i]);
    } catch (err) {
      console.log("Failed to set up module " + modules[i] + " due to " + err);
    }
    if (module) {
      if ("commands" in module) {
        for (var j = 0; j < cur_module.commands.length; ++j) {
          if (module.commands[j] in module) {
            bot.addCommand(module.commands[j], module[module.commands[j]]);
          }
        }
      }
    }
  }
});

bot.on("message", async message => {
  // Good rule of thumb to ignore message
  // from other bots (no anti-bot stuff pls)
  if (message.author.bot) return;

  // Ignore messages not starting with prefix
  // which we set in the config file
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Split message into command and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift.toLowerCase();
});

bot.login(token);
