var express = require('express');
var router = express.Router();
var app = require('../app').app;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('home', {});
});

router.get('/login', function(req, res) {
    res.render('login', {});
});

router.post('/login',
    app.passport.authenticate('local', app.locals.redirect('/location'))
);


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;