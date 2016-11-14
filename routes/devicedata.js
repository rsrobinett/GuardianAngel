var express = require('express');
var router = express.Router();

/* GET Example page. */

router.post('/', function(req,res,next){
    var devicedata = new DeviceData;
    devicedata = req.body;
    devicedata.deviceid = req.body.deviceid;
    //make dbcall
    res.json(devicedata);
});

function DeviceData() {
    this.deviceid;
    this.datatime;
    this.longitude;
    this.latitude;
    this.heartrate;
};
/*
router.get('/', function(req, res, next) {
    res.json({ message: 'hello world' });
    
});*/
module.exports = router;

//example json

/*
{
	"deviceid": "1",
	"datatime": "11/13/2016",
	"longitude": 45.464430,
	"latitude": -122.850351, 
	"heartrate": 100.99
}
*/