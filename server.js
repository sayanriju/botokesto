var irc = require('irc');
var bot = new irc.Client('chat.freenode.net', process.env.OPENSHIFT_APP_NAME || 'ircbot', {
    channels: ['#botzoo', '#botwar'],
    port: 8001,
    debug: true
});
