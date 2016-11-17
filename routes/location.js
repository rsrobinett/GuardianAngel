var express = require('express');
var router = express.Router();
var key = require('../config').staticKey;
var app = require('../app').app;

router.queryCallback = function (req, res) {
    return function (err, rows) {
        var context = {};
        context.empty = false;
        if (err) {
            console.log(err);
            res.json({error: err});
        } else if (rows.length == 0) {
            context.empty = true;
            res.render('location', context);
        } else {
            context.longitude = rows[0].Longitude;
            context.latitude = rows[0].Latitude;
            context.heartrate = rows[0].HeartRate;
            context.date = rows[0].DataTime;
            context.name = rows[0].Name;
            var location = context.longitude + "," + context.latitude;
            context.map = 'https://maps.googleapis.com/maps/api/staticmap?' + 'zoom=14&scale=2&size=300x300&markers='
                + location + '&key=' + key;
            context.username = req.user.username;
            res.render('location', context);
        }
    };
};

router.routeCallback = function (req, res) {
    req.app.con.query(req.app.queryBuilder.view.latestLocation(req.user, req.app.con), router.queryCallback(req, res));
};

router.get('/', app.loggedIn('/login'), router.routeCallback);

module.exports = router;