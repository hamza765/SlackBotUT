var SlackBot = require('slackbots');

// create a bot 
var bot = new SlackBot({
    token: 'xoxb-193213202310-ncgU3Pma55PEK8qYeMWMxC8J', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'shasta'
});


module.exports = bot;
