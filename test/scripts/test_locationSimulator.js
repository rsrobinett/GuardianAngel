var assert = require('assert');         // allows use of assert
var app = require('../../app.js').app;     // scope the app to the test suite
var device = require('../../scripts/locationSimulator');
var validate = app.locals.isValidReq;
var attributes = {
    deviceId: true,
    datatime: true,
    longitude: true,
    latitude: true,
    heartrate: true
};

describe('Location Simulator Object', function () {
    describe('initialization', function () {
        it('should create an instantiated object', function () {
            var loc = new device.LocationPush(10);
            assert(validate(attributes, loc));
        });
    });

    describe('randomize location', function () {
        it('should change the lon/lat attributes', function () {
            var unchanged = new device.LocationPush(10);
            var changed = new device.LocationPush(10);
            changed.randomize();
            assert(changed.latitude != unchanged.latitude);
            assert(changed.longitude != unchanged.longitude);
        });
        it('should timestamp the date to the current time', function () {
            var curTime = new device.LocationPush(10);
            assert(new Date() - curTime.datatime < 500);
        });
    });

    describe('submit a new location', function () {
        it('should submit a location to the db and return a success message', function (done) {
            var post = new device.LocationPush(app.locals.mocha.deviceID);
            app.con.query(app.queryBuilder.add.deviceData(post.randomize(), app.con), function (err) {
                done(err);
            });
        });
    });
});
