import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api';
import bot from './lib/bot.js';
mongoose.Promise = Promise;

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bot.on('start', function(data) {
    var params = {
        icon_emoji: ':cat:'
    };

    //bot.postMessageToChannel('general', 'meow!', params);

});

bot.on('message', function(data) {
    //if data object exists (there is a chat) proceed
    if (data.text) {

        //save method
        if (data.text.includes('.save')){
          //acknowledges method activated
          console.log(data);
          bot.postMessage(data.channel, 'I saw a save!');

          //if it's a file, post the dl link
          if(data.item.url_private_download){
            bot.postMessage(data.channel, data.item.url_private_download);
          }



        }


        if (data.text.startsWith('.countdown')) {
            var args = data.text.split(' ');
            var day = args[1];
            if (day == 'mw') {
                var classStart = new Date(2017, 5, 5, 18, 30);
            } else if (day === 'tt') {
                var classStart = new Date(2017, 5, 6, 18, 30);
            }
            var date = Date.now();
            var timeDiff = classStart - date;

            timeDiff /= 1000;

            // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
            var seconds = Math.round(timeDiff % 60);

            // remove seconds from the date
            timeDiff = Math.floor(timeDiff / 60);

            // get minutes
            var minutes = Math.round(timeDiff % 60);

            // remove minutes from the date
            timeDiff = Math.floor(timeDiff / 60);

            // get hours
            var hours = Math.round(timeDiff % 24);

            // remove hours from the date
            timeDiff = Math.floor(timeDiff / 24);

            // the rest of timeDiff is number of days
            var days = timeDiff;
            var remain = `Time left: ` + days + ` days, ` + hours + ` hours, ` + minutes + ` minutes, and ` + seconds + ` seconds.`;

            bot.postMessage(data.channel, remain)
        }
    }
});


app.use(express.static('./client'));

// // api router
// app.use('/api', api());

// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res) {
//     res.redirect(301, '/404');
// });


app.listen(process.env.PORT || 8080, function() {
    console.log("App running on port 8080!");
});

export default app;
