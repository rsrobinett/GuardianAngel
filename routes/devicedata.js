var express = require('express');
var router = express.Router();

/* GET Example page. */
// in the real world we'd probably want to encrypt a child's location
router.post('/', function(req,res,next){

    req.app.con.query(req.app.queryBuilder.add.deviceData(req.body, req.app.con), function(err, rows) {
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({ message : "successfully saved the data" });
        }
    });
    
});

module.exports = router;

//example json.

/*
{
	"deviceid": "1",
	"datatime": "11/13/2016",
	"longitude": 45.464430,
	"latitude": -122.850351, 
	"heartrate": 100.99
}
*/