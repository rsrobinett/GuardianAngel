var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
    
    var context = {};
    context.page = "Example";
    context.value = req.app.config.exampleConfigValue;
    context.config = req.app.config;
    res.render('example', context);  
});

module.exports = router;

