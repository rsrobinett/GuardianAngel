//set up required modules
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var session = require('express-session');
var pp = require('./pp');
var db = require('./config').dbLogin;
app.loggedIn = require('connect-ensure-login').ensureLoggedIn;
app.config = require('./config');
app.queryBuilder = require('./scripts/querybuilder').queryBuilder;
app.locals = app.config.globals;
exports.app = app;

//create db connection using local or live db, also set mocha test IPs
var port = process.env.PORT || 3000;
app.con = mysql.createConnection(db.local);  // change to db.ec2 for AWS host or db.c9 for c9 testing

//set up public directories
app.use('/public', express.static(__dirname + '/public'));

//set up bodyparser for POST requests, needed to parse req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set up session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// set up passport
pp(app);

// set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//start web server
app.listen(port);

//setup routes
var home = require('./routes/home');
var register = require('./routes/register');
var deviceData = require('./routes/devicedata');
var location = require('./routes/location');
var history = require('./routes/history');

//map routes
app.use('/', home);
app.use('/register', register);
app.use('/devicedata', deviceData);
app.use('/location', location);
app.use('/history', history);

// set devices to push data
var active = true;
if (active) {
    var locationSimulator = require('./scripts/locationSimulator');
    locationSimulator.executeAll();
}

// placeholder route error handling
app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500');
});