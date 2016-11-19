var assert = require('assert');
var app = require('../../app.js').app;
var request = require('supertest');
var login = '/login';
var location = '/location';
var home = '/';

describe('Location Get Route', function () {
    var agent;
    before(function(done){
        agent = request.agent(app);
        agent
            .post(login)
            .send(app.locals.mocha)
            .expect('Location', location)
            .expect(302, done);
    });

    it('Should route to location page', function (done) {
        agent
            .get(location)
            .expect(200, done);
    });

    it('should fail to login and redirect to "/login"', function (done) {
        agent
            .post(login)
            .send()
            .expect('Location', login)
            .expect(302, done)
    });
});

describe('Home Get Routes Not Logged In', function () {
    var agent = request.agent(app);
    it('should direct to "/"', function (done) {
        agent
            .get(home)
            .expect(200, done)
    });

    it('should direct to "/login"', function (done) {
        agent
            .get(login)
            .expect(200, done)
    });
});

describe('Home Get Routes Logged In', function () {
    var agent;
    before(function(done){
        agent = request.agent(app);
        agent
            .post(login)
            .send(app.locals.mocha)
            .expect('Location', location)
            .expect(302, done);
    });

    it('should direct to home', function (done) {
        agent
            .get(home)
            .expect(200, done)
    });

    it('should direct to login', function (done) {
        agent
            .get(login)
            .expect(200, done)
    });
});