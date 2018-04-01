const ping = {
  test: /^ping$/,
  usage: '',
  description: 'Checks network latency',
  process: (bot, msg, args) => {
    msg.channel.send(msg.author + ' pong!');
    if (args.length !== 0) {
      msg.channel.send('Note: ping takes no arguments');
    }
  }
};

module.exports = {
  commands: [ping]
};
