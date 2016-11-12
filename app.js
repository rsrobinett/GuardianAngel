//set up required modules
var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var sqlCtrl = require('./sqlApi');
var db = require('./config').dbLogin;
var queryBuilder = require('./querybuilder').queryBuilder;

//create db connection using local or live db
var con = mysql.createConnection(db.c9);
var port = process.env.PORT;

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
sqlCtrl(app, con);

//setup routes
var home = require('./routes/home');
var login = require('./routes/login');
var example = require('./routes/example');

//setup views
app.use('/', home);
app.use('/login', login);
app.use('/example', example);

// we will build our get/post request handlers in node (probably a new file)
// it will have the signature of app.get('/route', function).  Function is where
// we will return either a view OR a data object depending on the query.  Some
// routes will be nested when node needs to first handle a query request to the 
// database, then return the data from the database via a new rendered page or
// data object.  We will probably abstract this away in the sqlApi functions

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
