var express = require('express');
var router = express.Router();
var key = require('../config').staticKey;
var app = require('../app').app;

router.queryCallback = function (req, res) {
    return function (err, rows) {
        var context = {};
        context.empty = false;
        if (err) {
            res.status(500).send(err);
        } else if (rows.length == 0) {
            context.empty = true;
            res.render('location', context);
        } else {
            context = rows[0];
            context.username = req.user.username;
            context.datatime = context.datatime.toLocaleString();
            res.render('location', context);
        }
    };
};

router.routeCallback = function (req, res) {
    req.app.con.query(req.app.queryBuilder.view.latestLocation(req.user, req.app.con), router.queryCallback(req, res));
};

router.get('/', app.loggedIn('/'), router.routeCallback);

module.exports = router;