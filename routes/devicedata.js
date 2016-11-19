var express = require('express');
var router = express.Router();
router.isValidReq = require('../config').globals.isValidReq;

router.expects = {
    deviceId: 'int',
    datatime: 'Date',
    longitude: 'double',
    latitude: 'double',
    heartrate: 'int'
};

router.newLocationCallback = function (req, res) {
    if (router.isValidReq(router.expects, req.body) == false) {
        res.status(500).send(router.expects);
    } else {
        req.app.con.query(req.app.queryBuilder.add.deviceData(req.body, req.app.con), function (err, rows) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(rows);
            }
        });
    }
};

router.post('/', router.newLocationCallback);
module.exports = router;
