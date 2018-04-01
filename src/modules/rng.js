const path = require('path');
const util_dir = path.join(__dirname, '../utils/');
const fisher_yates = require(path.join(util_dir, 'fisher_yates.js'));

const roll = {
  test: /^roll/,
  usage: 'roll [number of dice]d[number of sides on dice] <options>\n'
       + 'Options:\n s: Return sum (default)\n i: Return individual dice',
  description: 'Rolls dice',
  process: (bot, msg, args) => {
    if(args.length === 0 || !/[0-9]+d[0-9]+/.test(args[0])) {
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
      reply = reply.concat(Array(num1).fill().map(() => {
        return Math.floor(1 + Math.random() * num2);
      }).reduce((a, b) => a + b, 0).toString());
    } else if(opt === 'i') {
      Array(num1).fill().map(() => {
        return Math.floor(1 + Math.random() * num2);
      }).forEach(num => {
        reply = reply.concat(num.toString() + ', ');
      });
    }
    msg.channel.send(reply);
  }
};

const sample = {
  test: /^sample/,
  usage: 'sample <opt1> <opt2> ... <optn>',
  description: 'Returns a random choice from the given options, separated by spaces',
  process: (bot, msg, args) => {
    if(args.length === 0) {
      msg.channel.send('You have to give me options to pick from!');
      return;
    }
    msg.channel.send('I pick: ' + args[Math.floor(Math.random() * args.length)]);
  }
};

const card = {
  test: /^card/,
  usage: 'card [number of cards to draw]',
  description: 'Draws cards from a standard deck of cards, default number is 1',
  process: (bot, msg, args) => {
    if(args.length === 0 | !/[0-9]+$/.test(args[0])) {
      msg.channel.send('Invalid parameters given.');
      return;
    }
    const num = args.length === 0 ? 1 : parseInt(args[0]);
    if(num <= 0) {
      msg.channel.send('I have to draw a positive amount of cards!');
      return;
    }
    if(num > 52) {
      msg.channel.send('There aren\'t that many cards in a deck!');
      return;
    }
    let allcards =   ['Ace of hearts',
                      'Two of hearts',
                      'Three of hearts',
                      'Four of hearts',
                      'Five of hearts',
                      'Six of hearts',
                      'Seven of hearts',
                      'Eight of hearts',
                      'Nine of hearts',
                      'Ten of hearts',
                      'Jack of hearts',
                      'Queen of hearts',
                      'King of hearts',
                      'Ace of spades',
                      'Two of spades',
                      'Three of spades',
                      'Four of spades',
                      'Five of spades',
                      'Six of spades',
                      'Seven of spades',
                      'Eight of spades',
                      'Nine of spades',
                      'Ten of spades',
                      'Jack of spades',
                      'Queen of spades',
                      'King of spades',
                      'Ace of diamonds',
                      'Two of diamongs',
                      'Three of diamonds',
                      'Four of diamonds',
                      'Five of diamonds',
                      'Six of diamonds',
                      'Seven of diamonds',
                      'Eight of diamonds',
                      'Nine of diamonds',
                      'Ten of diamonds',
                      'Jack of diamonds',
                      'Queen of diamonds',
                      'King of diamonds',
                      'Ace of clubs',
                      'Two of clubs',
                      'Three of clubs',
                      'Four of clubs',
                      'Five of clubs',
                      'Six of clubs',
                      'Seven of clubs',
                      'Eight of clubs',
                      'Nine of clubs',
                      'Ten of clubs',
                      'Jack of clubs',
                      'Queen of clubs',
                      'King of clubs'];
    fisher_yates.random_shuffle(allcards);
    allcards = allcards.slice(52 - num);
    var reply = 'The following cards were drawn:\n';
    allcards.forEach(card => {
      reply = reply.concat(card + '\n');
    });
    msg.channel.send(reply);
  }
};

module.exports = {
  commands: [roll, sample, card]
};
