var assert = require('assert');
var app = require('../../app.js').app;
var request = require('supertest');
var register = '/register';
var submit = '/register/new';
var home = '/';

describe('View registration page', function () {
    var agent = request.agent(app);
    it('should direct to the registration page', function (done) {
        agent
            .get(register)
            .expect(200, done)
    });
});

describe('Post Users', function () {
    var agent = request.agent(app);
    it('Should Add a New User Account', function (done) {
        var user = {};
        user.username = (Math.random() * 100000).toString();
        user.password = 'password';
        user.child = 'child';
        agent
            .post(submit)
            .send(user)
            .expect('Location', home)
            .expect(302, done)
    });

    it('Should Report User Exists', function (done) {
        agent
            .post(submit)
            .send(app.locals.mocha)
            .expect(409, done)
    });

    it('Should Report Invalid User', function (done) {
        var user = {};
        user.username = "";
        user.password = 'pass';
        user.child = 'child';
        agent
            .post(submit)
            .send(user)
            .expect(500)
            .expect({
                username: 'string',
                password: 'string',
                child: 'string'
            }, done)
    });
});
