var express = require('express');
var router = express.Router();

/* GET Example page. */

router.post('/', function(req,res,next){

    req.app.con.query(req.app.queryBuilder.add.deviceData(req.body, req.app.con), function(err, rows) {
        var context = {};
        if(err)
        {
            context.err = err.message;
            res.send(context.err);
        }
        else{
            res.send("successfully saved the data");
        }
    });
    
});

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