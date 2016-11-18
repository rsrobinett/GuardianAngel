var app = require('../app').app;
var request = require('supertest')(app);
var assert = require('assert');
var route = '/register/new';
var user = app.locals.mocha;
app.counter = 0;

before(function (done) {
    // creates a user/child in the database to use for testing purposes.  If it already exists, just updates deviceID
    request
        .post(route)
        .send(user)
        .end(function(err, res){
            if (res.statusCode == 500) {
                throw new Error('server error');
            }
            done(err);
        })
});

before(function (done) {
    //creates a user/child in the database to use for testing purposes.  If it already exists, just updates deviceID
    app.con.query(app.queryBuilder.view.childDevice(user, app.con), function(err, rows){
        if (rows.length == 0) {
            throw new Error('user device not found');
        } else {
            app.locals.mocha.deviceID = rows[0].id;  // updates to correct deviceId for mocha entry
            done(err);
        }
    });
});


describe('hook', function () {
    it('Setting Up Database for Testing', function () {});
});