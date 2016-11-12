var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
    var context = {};
    context.page = "Login";
    res.render('login', context);  // data is added to the view via handlebars template
});

module.exports = router;
