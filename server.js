/*
 * Botokesto is an IRC bot written using node.js
 * *********************************************
 * Copyleft 2013 Sayan "Riju" Chakrabarti
 * <s26c.sayan[at]gmail>
 * *************************************************************
 *  
 * This program is free (as in Freedom) software; you can
 * redistribute it and/or modify it under the terms of
 * the DBAD Public License, as defined at:
 * http://raw.github.com/philsturgeon/dbad/master/LICENSE-en.md
 * 
 * *************************************************************
 */

//process.exit();

var config = {
	channels: ["#testmybot","#glugcalinfo"],
	server: "irc.freenode.net",
	botName: "Glugbot",
    userName:"Botokesto",
    realName:"Botokesto ChatterG",
    floodProtection: false,
    port:8001 //6667
};

var irc=require("irc");
var S=require("string");

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
var swearWords=['fuck','dick','cunt','pussy','shit','bitch','bastard','bloody','wtf'];

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

// Welcome on join
bot.addListener("join", function(channel,nick,message){     // welcome on join
    if(nick!=config.botName){
        bot.say(channel,channel+" welcomes you aboard, "+nick+". Enjoy your stay!");
        if(S(nick).endsWith('_')){
            bot.say(channel,"BTW "+nick+", are you a ghost? Perhaps you should try /msg nickserv ghost [username] [password]");
        }
    }        
});

// Profanity checker
bot.addListener("message",function(from,to,message){    // Check for swear words
    if(checkForWords(swearWords,message)){
        bot.say(to,from+", please refrain from using profanity in the channel.");
        //warnedNicks.push(from);
    }
});

// Factoid parser
function getResponse(factoid){
    var response='';
    switch (factoid.toLowerCase()){

    case "ask" :
    case "help" :
    case "justask" :
    case "question" :
    case "problem" :
        response="Please don't ask to ask a question, simply ask the question (all on ONE line and in the channel, so that others can read and follow it easily). If anyone knows the answer they will most likely reply. :-)";
        break;
    case "pastebin" :
    case "paste" :
    case "flood" :
    case "flooding" :
    case "pasting" :
        response="For posting multi-line texts into the channel, please use http://pastebin.com and post the resulting link here.";
        break;
    case "language" :
    case "profanity" :
    case "nsfw" :
    case "swear" :
    case "curse" :
    case "swearing" :
    case "cursing" :
        response="Please watch your language and topic to help keep this channel family-friendly, polite, and professional.";
        break;    
    case "hello" :
    case "hi" :
    case "howdy" :
    case "hola" :
    case "ahoy" :
    case "swearing" :
    case "cursing" :
        response= S(factoid).capitalize().s+"! How are you doing? ";
        break;
    case "bye" :
    case "goodbye" :
    case "good bye" :
    case "tata" :
    case "ciao" :
    case "see you":
    case "hasta la vista":
    case "au revoir":
    case "c ya" :
    case "cya" :
        response= S(factoid).capitalize().s+"! It was nice having you here, do come back soon! :=) ";
        break;
        
        
    case "allcaps":
    case "caps":
    case "capslock":
    case "shout":
    case "shouting":
        response="Please turn off your CAPSLOCK. Typing in all CAPS is akin to SHOUTING!";
        break;
    case "irc":
    case "irc beginner":
    case "irc guide":
    case "irc howto":
        response="For a nice IRC primer, please visit http://tldp.org/HOWTO/IRC/beginners.html";
        break;
    case "networketiquette":
    case "networkettiquette":
    case "etiquette":
    case "ettiquette":
    case "net etiquette":
    case "net ettiquette":
    case "network etiquette":
    case "network ettiquette":
    case "internet etiquette":
    case "internet ettiquette":
    case "netiquette":
    case "nettiquette":
    case "coc":
    case "codeofconduct":
    case "code of conduct":
    case "conduct":
    case "behave":
    case "behavior":
    case "behaviour":
        response="To know how to maintain basic net etiquette, please visit http://www.networketiquette.net/ ";
        break;  
    case "n00b":
    case "noob":
    case "newbie":
    case "beginner":
    case "smart question":
    case "how to ask":
        response="If you are a newbie, perhaps this extensive treatise is a good place to start off: http://www.catb.org/esr/faqs/smart-questions.html";
        break;
    case "lnw":
    case "linux is not windows":
    case "linux vs windows":
        response="Linux is Not Windows : please visit http://linux.oneandoneis2.org/LNW.htm to learn why.";
        break;

    
    case "who are you" :
    case "about you" :
    case "bot" :
    case "yourself" :
    case "you" :
        response= "Hi, I'm "+config.realName+". I'm the resident bot of this channel, striving to make your stay here a pleasant one! :=)";
        break;
    case "who we are" :
    case "who are we" :
    case "about":
    case "about us" :
    case "aboutus" :
    case "channel" :
    case "glugcalinfo" :
    case "glugcal":
    case "glug":
    case "info":
    case "information":
        response= "This is the official IRC channel for our GNU/Linux Users Group, Kolkata Chapter. Please visit our website http://ilug-cal.info for further information.";
        break;
    case "website":
    case "web":
    case "web address":
    case "url":
    case "site":
        response="Our website is at http://ilug-cal.info";
        break;
    case "news" :
    case "latest news" :
    case "happening" :
        response= "Please visit http://ilug-cal.info for information on latest news.";
        break;
    case "event" :
    case "events" :
    case "upcoming" :
    case "calendar" :
    case "event calendar" :
        response= "Please visit http://ilug-cal.info for information on upcoming events.";
        break;


    case "windows":
    case "windoze":
    case "winblows":
        response="Windows are frameworks of wood or metal containing a glass pane and are built into a wall or roof to admit light or air! ;=)";
        break;
    case "linux":
    case "lunix":
        response="Linux is JUST the kernel! May s/he who says anything to the contrary meet his/her FreeDoom!!! ;=)"
        break;
    case "gnu":
    case "gnulinux":
        response="That popular unix-like operating system must be called GNU/Linux! May s/he who says anything to the contrary meet his/her FreeDoom!!! ;=)"
        break;
    case "nitpick":
    case "nitpicking":
        response="Is this is what you're doing: http://en.wikipedia.org/wiki/Nitpicking_%28pastime%29 ? ;=)";
        break;
    case "rms":
    case "stallman":
    case "richard stallman":
    case "richard mark stallman":
        response="RMS is a living God! Visit http://stallman.org/ to bow & pray at his altar! ;=)"
        break;
        
    case "prayer":
        response="Dear <your_favorite_deity_here>, Give me strength to understand and work with users who question my logic, the rules, netiquette, and common sense. Give me resilience to teach them the basics of Linux, GNU, FSF, and IRC. Allow me not to stray to nitpicking, argument, foul language, or leisurely op abuse. Deliver me my daily xkcd, User Friendly, LWN, and guard over my encrypted drives. Let it be so."
        break;
    case "ping":
        response="pong!";
        break;

    default: response="Sorry, my responses are limited. You must ask the right question.";
    }

    return response;
}

// Check for factoid commands //

bot.addListener("message",function(nick,channel,message){    // Check if starts with botname 
    if (S(message.toLowerCase()).startsWith(config.botName.toLowerCase())){
        var factoid=S(message.toLowerCase()).chompLeft(config.botName.toLowerCase()).stripPunctuation().trim().s;
        bot.say(channel,nick+": "+getResponse(factoid));
    } 
});

bot.addListener("message",function(nick,channel,message){    // Check if starts with ! 
    if (S(message.toLowerCase()).startsWith('!')){
        // Advanced mode: ![something] | [someone] OR ![something] > [someone]
        if(S(message).contains('|')){
            var to_nick=S(message.replace(/^.*\|/,'')).trim().s;
            if(to_nick=='' || to_nick=='me')
                to_nick=nick;
            var factoid=S(message.replace(/\|.*$/,'')).stripPunctuation().trim().s;
            bot.say(channel,to_nick+": "+getResponse(factoid)); // mention [someone]
        }
        else if(S(message).contains('>')){
            var to_nick=S(message.replace(/^.*\>/,'')).trim().s;
            if(to_nick=='' ||to_nick=='me' )
                to_nick=nick;
            var factoid=S(message.replace(/\>.*$/,'')).stripPunctuation().trim().s;
            bot.say(to_nick,getResponse(factoid));  // PM [someone]
        }
        else{
            // Simple mode: Respond directly to the invoking nick
            var factoid=S(message.toLowerCase()).stripPunctuation().trim().s;
            bot.say(channel,nick+": "+getResponse(factoid));
        }
    }

});

bot.addListener("pm",function(nick,channel,message){ // Handle PM to bot
    var factoid=S(message.toLowerCase()).stripPunctuation().trim().s;  
    bot.say(nick,getResponse(factoid));
});
