var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
    var context = {};
    context.page = "Example";
    res.render('example', context);  // data is added to the view via handlebars template
});

module.exports = router;
