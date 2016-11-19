var assert = require('assert');         // allows use of assert
var app = require('../../app.js').app;     // scope the app to the test suite
var request = require('supertest')(app);
var device = require('../../scripts/locationSimulator');

var route = '/devicedata';
var invalidUser = new device.LocationPush(-1);
var invalidBody = {missing: "attributes"};

describe('Device Data posts', function () {
    it('should make a successful post request', function (done) {
        var validUser = new device.LocationPush(app.locals.mocha.deviceID);
        request
            .post(route)
            .send(validUser)
            .expect(200)
            .expect(function (res) {
                if (res.body.affectedRows != 1) {
                    throw new Error('row not added')
                }
            })
            .end(function (err) {
                done(err);
            })
    });

    it('should return user not found', function (done) {
        request
            .post(route)
            .send(invalidUser)
            .expect(500)
            .expect(function (res) {
                if (res.body.errno != 1452) {
                    throw new Error('should have foreign key error')
                }
            })
            .end(function (err) {
                done(err);
            })
    });

    it('should return invalid body', function (done) {
        request
            .post(route)
            .send(invalidBody)
            .expect(500)
            .expect({
                deviceId: 'int',   // expect valid body object
                datatime: 'Date',
                longitude: 'double',
                latitude: 'double',
                heartrate: 'int'
            })
            .end(function (err) {
                done(err);
            })
    });
});


