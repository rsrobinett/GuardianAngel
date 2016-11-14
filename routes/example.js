var express = require('express');
var router = express.Router();

/* GET Example page. */

router.get('/', function(req, res, next) {
    req.app.con.query(req.app.queryBuilder.view.demo(), function(err, rows) {
        var context = {};
        if(err)
        {
            context.err = err.message;
            res.send(context.err);
        }
        else{
                context.page = "Example";
                context.value = req.app.config.exampleConfigValue;
                context.config = req.app.config;
                context.config = req.app.config.exampleConfigValue;
                context.demodata = rows; 
                console.log(context);
                res.render('example', context); 
        }
    });
});
module.exports = router;

