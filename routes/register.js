/*
    /register : registration page, send following json on submission click to /register/add
    {
        username: string,
        password: string,
        child: string
    }
    returns: "error or redirects to home page"
*/
var express = require('express');
var router = express.Router();
var locationSimulator = require('../scripts/locationSimulator');

router.isValidReq = require('../config').globals.isValidReq;
router.expects = {
    username: 'string',
    password: 'string',
    child: 'string'
};

router.viewSignupPage = function (req, res) {
    res.render('register', {});
};

router.newCallback = function (req, res) {
    var qb = req.app.queryBuilder;
    var con = req.app.con;
    if (router.isValidReq(router.expects, req.body) == false){
        res.json(router.expects);
    } else {
        con.query(qb.view.userExists(req.body, con), router.userExistsCallback(qb, con, req, res));
    }
};

router.userExistsCallback = function (qb, con, req, res) {
    return function (err, rows) {
        var result = {};
        if (err) {
            console.log(err);
            result.message = "db error";
            res.json(result);
        }
        else if (rows[0].hasOwnProperty('count') && rows[0].count == 1) {
            result.message = "account exists";
            res.json(result);
        }
        else {
            var addQueries = qb.add.guardian(req.body, con) + "; " + qb.add.device(req.body, con);
            con.query(addQueries, router.addGuardianDeviceCallback(qb, con, req, res));
        }
    }
};

router.addGuardianDeviceCallback = function (qb, con, req, res) {
    return function (err, rows) {
        var result = {};
        if (err) {
            console.log(err);
            result.message = "error adding username/device";
            //TODO delete username or device if added
            res.json(result);
        } else {
            var addPair = {};
            addPair.guardianId = rows[0].insertId;
            addPair.deviceId = rows[1].insertId;
            con.query(qb.add.deviceGuardianPair(addPair, con), router.gdPairCallback(req, res, addPair.deviceId));
        }
    }
};

router.gdPairCallback = function (req, res, id) {
    return function (err, rows) {
        var result = {};
        if (err) {
            console.log(err);
            result.message = "error adding device/user pair";
            //TODO delete username and device bc pair failed
            res.json(result);
        } else {
            var user = {};
            user.id = id;
            user.password = req.body.password;
            user.username = req.body.username;
            req.login(user, function(err) {
                if (err) { return next(err); }
                locationSimulator.executeNew(user.id);
                return res.redirect('/');
            });
        }
    }
};

router.post('/new', router.newCallback);
router.get('/', router.viewSignupPage);
module.exports = router;

