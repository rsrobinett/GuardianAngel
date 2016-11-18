var assert = require('assert');
var app = require('../../app.js').app;
var request = require('supertest');
var login = '/login';
var home = '/';
var user;

describe('Home Post Routes', function () {
    var agent = request.agent(app);
    it('should login successfully and redirect to home', function (done) {
        user = app.locals.mocha;
        agent
            .post(login)
            .send(user)
            .expect('Location', home)
            .expect(302, done);
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
    it('should direct to "/login"', function (done) {
        agent
            .get(home)
            .expect(302)
            .expect('Location', login, done)
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
            .send(user)
            .expect('Location', home)
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