const roll = {
  test: /^roll/,
  usage: 'roll [number of dice]d[number of sides on dice] <options>\n'
       + 'Options:\n s: Return sum (default)\n i: Return individual dice',
  description: 'Rolls dice',
  process: (bot, msg, args) => {
    if(!/[0-9]+d[0-9]+/.test(args[0])) {
      msg.channel.send('Invalid parameters given.');
      return;
    }
    if(args.length > 1) {
      if(args.length > 2 || !/[si]/.test(args[1])) {
        msg.channel.send('Invalid parameters given.');
        return;
      }
    }
    const num1 = Number(args[0].match(/[0-9]+/g)[0]);
    const num2 = Number(args[0].match(/[0-9]+/g)[1]);
    if(num1 <= 0) {
      msg.channel.send('I have to roll a positive amount of dice!');
      return;
    }
    if(num2 <= 0) {
      msg.channel.send('I don\'t have dice with that few sides!');
      return;
    }
    if(num1 > 100) {
      msg.channel.send('I don\'t have that many dice!');
      return;
    }
    if(num2 > 1000000) {
      msg.channel.send('I don\'t have dice that large!');
      return;
    }
    const opt = args.length === 1 ? 's' : args[1];
    var reply = num1 === 1 ? 'Your roll returned: ' : 'Your rolls returned: ';
    if(opt === 's') {
      reply.concat(Array(num1).fill().map(() => {
        return Math.floor(1 + Math.random() * num2);
      }).reduce((a, b) => a + b, 0).toString());
    } else if(opt === 'i') {
      Array(Number(num1)).fill().map(() => {
        return Math.floor(1 + Math.random() * num2);
      }).forEach(num => {
        reply.concat(num.toString() + ', ');
      });
    }
    msg.channel.send(reply);
  }
};

module.exports = {
  commands: [roll]
};
