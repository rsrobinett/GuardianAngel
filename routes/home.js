var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // demo route: this route queries our sample table in our database using the
    // querybuilder object.  You build your SQL querystring in the querystring.js file, then
    // call the function to return the string you need
    // here is where you will make your API calls and get the data you need to render
    // your handlebars page.  Save everything to the context object that is passed
    // to render.  Below is an example using querybuilder with the demo table that is
    // set up.  Note the first param is a SQL string returned from querybuilder
    //con.query(queryBuilder.view.demo(), function (err, rows) {
    //if (err) {
    //    res.sendStatus(500);
    //}
    //else {
        var context = {};
        //context.val = rows[0];  // rows will be an array of table rows, we grab the first row
        context.page = "Homepage";
        res.render('home', context);  // data is added to the view via handlebars template
    //}
    //});
});

module.exports = router;