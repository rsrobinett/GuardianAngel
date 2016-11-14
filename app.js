//set up required modules
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var sqlCtrl = require('./sqlApi');
var db = require('./config').dbLogin;
var config = require('./config');
var queryBuilder = require('./scripts/querybuilder').queryBuilder;

//setup configfile and local variables
app.config = config;
app.locals = config.globals;

//create db connection using local or live db
var port = process.env.PORT;
app.con = mysql.createConnection(db.c9);


//setup queries
app.queryBuilder = queryBuilder;

//set up public directories
app.use('/public', express.static(__dirname + '/public'));


//set up bodyparser for POST requests, needed to parse req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//start web server
app.listen(port);
sqlCtrl(app, app.con);

//setup routes
var home = require('./routes/home');
var login = require('./routes/login');
var example = require('./routes/example');
var devicedata = require('./routes/devicedata');

//setup views
app.use('/', home);
app.use('/login', login);
app.use('/example', example);
app.use('/devicedata', devicedata);

// placeholder route error handling
app.use(function(req,res){
    res.status(404);
    res.send('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500');
});
