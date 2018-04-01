exports.commands = [
    'ping'
]

exports.ping = {
    usage: '',
    description: 'Checks network latency',
    process: (bot, msg, args) => {
        msg.channel.send(msg.author + ' pong!');
        if(args) {
            msg.channel.send('Note: ping takes no arguments');
        }
    }
}