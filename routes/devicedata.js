var express = require('express');
var router = express.Router();
router.isValidReq = require('../config').globals.isValidReq;
router.expects = {
    deviceId: 'int',
    dataTime: 'Date',
    logitude: 'double',
    latitude: 'double',
    heartrate: 'int'
};

router.newLocationCallback = function (req, res) {
    if (router.isValidReq(router.expects, req.body) == false) {
        console.log("error adding device data, expected: ", router.expects);
    } else {
        req.app.con.query(req.app.queryBuilder.add.deviceData(req.body, req.app.con), function (err, rows) {
            if (err) {console.log(err);}
        });
    }
};

router.post('/', router.newLocationCallback);
module.exports = router;

//example json.

/*
 {
 "serialnumber": "1",
 "datatime": "11/13/2016",
 "longitude": 45.464430,
 "latitude": -122.850351,
 "heartrate": 100.99
 }
 */