var assert = require('assert');
var app = require('../../app.js').app;
var valreq = app.locals.isValidReq;

describe('isValidReq Test', function () {
    it('should find missing and invalid params', function () {
        var expects = {
            a: "",
            b: ""
        };
        var has = Object.create(null);
        has.a = null;
        has.b = "has";
        
        assert(valreq(expects, has) == false);
        has.a = 'has';
        assert(valreq(expects, has));
        expects.c = 'has';
        assert(valreq(expects, has) == false);
        has.c = "";
        assert(valreq(expects, has) == false);
        has.c = 'has';
        assert(valreq(expects, has));
    });
});
