const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");



var API_KEY = 'YOUR-MAILGUN-API-KEY';
var DOMAIN = 'YOUR-DOMAIN-NAME';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'saurabh.gattani@gmail.com, vaishalir23@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};



var originsWhitelist = [
    'http://localhost:4200'
	// add more whitelisted URLs here comma separated
];
var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
// whitelist domains for CORS/CORB
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log('[mock] requested URL:', req.url);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/sendMails', function(req, res) {
    const mailObj = {
        from: 'Golibrary <me@samples.mailgun.org>',
        to: req.body && req.body.join(','),
        subject: 'Test email from Mailgun Nodejs API',
        text: 'Testing some Mailgun awesomeness!!'
    };
    mailgun.messages().send(mailObj, (error, body) => {
        // if error, send error and log it
        if (error) {
            res.send({ error : error});
            console.log("got an error: ", error);
        }
        // success, send success and log it
        else {
            res.send({ email : body });
            console.log(body);
        }
    });
});

const routes = require("./mock.routes.js")(app);

const server = app.listen(3456, function() {
    console.log("[mock] mock server listening on port %s...", server.address().port);
});