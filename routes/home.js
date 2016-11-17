var express = require('express');
var router = express.Router();
var app = require('../app').app;

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login', {});
});

router.post('/login',
    app.passport.authenticate('local', app.locals.redirect('/'))
);

router.get('/', app.loggedIn('/login'), function(req, res) {
    var context = {};
    context.username = req.user.username;
    res.render('home', context);
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;