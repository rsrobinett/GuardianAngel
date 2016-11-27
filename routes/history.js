var express = require('express');
var router = express.Router();
var app = require('../app').app;

router.queryCallback = function (req, res) {
    return function (err, rows) {
        var context = {};
        context.empty = false;
        if (err) {
            res.status(500).send(err);
        } else if (rows.length == 0) {
            context.empty = true;
            res.render('history', context);
        } else {
            context.username = req.user.username;
            context.history = [rows[0]];
            for (var i = 1; i < rows.length; i++) {
                if (rows[i].datatime.getHours() != context.history[context.history.length - 1].datatime.getHours()) {
                    context.history.push(rows[i]);
                }
            }
            res.render('history', context);
        }
    };
};

router.routeCallback = function (req, res) {
    req.app.con.query(req.app.queryBuilder.view.locationHistory(req.user, req.app.con), router.queryCallback(req, res));
};

router.get('/', app.loggedIn('/login'), router.routeCallback);

module.exports = router;