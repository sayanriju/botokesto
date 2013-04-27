/*
 * Botokesto is an IRC bot written using node.js
 * *********************************************
 * Copyleft 2013 Sayan "Riju" Chakrabarti
 * *********************************************
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 */

//process.exit();

var config = {
	channels: ["#testmybot","#glugcalinfo"],
	server: "irc.freenode.net",
	botName: "Glugbot",
    userName:"Botokesto",
    realName:"I am a Bot!",
    floodProtection: true,
    port:6667//8001
};

var irc=require("irc");
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels,
    port:config.port,
    userName:config.userName,
    realName:config.realName
});

// Prevent crashing
bot.addListener('error', function(message) {
    console.log('error: ', message);
});

// Config Vars
var helloWords=['hello','howdy','hola','ahoy'];
var byeWords=['bye','tata','ciao','c ya','cya'];
var swearWords=['fuck','dick','cunt','pussy','shit','bitch','bastard','bloody'];

var warnedNicks=[];

// Helper Functions

function checkForWords(wordlist,msg){
    length = wordlist.length;
    while(length--) {
        if (msg.toLowerCase().indexOf(wordlist[length])!=-1) {
           return true;
        }
    }
    return false;
}


// The Listeners

bot.addListener("message",function(from,to,message){    // Check for hello words
    if(checkForWords(helloWords,message))
        bot.say(to,"Hello "+from+"! How are you?");
});

bot.addListener("message",function(from,to,message){    // Check for bye words
    if(checkForWords(byeWords,message))
        bot.say(to,"Leaving so soon, "+from+"?");
});

bot.addListener("message",function(from,to,message){    // Check for swear words
    if(checkForWords(swearWords,message)){
        bot.say(to,from+", please refrain from using profanity in the channel.");
        //warnedNicks.push(from);
    }
});

bot.addListener("message",function(from,to,message){    // Check for bot name
        if (message.indexOf(config.botName)!=-1) 
            bot.say(to,"I am a bot, "+from+"! You sure you wanna chat with /me?");
});

bot.addListener("pm",function(from,to,message){ // Handle PM to bot
    bot.say(from,"Sorry, "+from);
    bot.say(from,"My responses are limited. You must ask the right question.");
});

bot.addListener("join", function(channel,nick,message){     // welcome on join
    if(nick!=config.botName)
        bot.say(channel,channel+" welcomes you aboard, "+nick+". Enjoy your stay!");
});
