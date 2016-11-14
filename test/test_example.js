var assert = require('assert');         // allows use of assert
var app = require('../app.js').app;     // scope the app to the test suite
var exampleFuncs = new ExampleTests();  // keeps function scope local

describe('Simple Demo', function() {
    describe('demo pass test', function() {
        it('should demo a passing', function() {
            assert.equal(2, 1 + 1); 
        });
    });
  
    describe('demo fail test', function() {
        it('should demo a failing test', function() {
            assert.equal(2, 1 + 2);
        });
    });
    
    describe('demo using named function test', function() {
        // note here we pass the function but do NOT execute it, param should be 
        // a function
        it ('should pass using a named function', exampleFuncs.noWrapperExample);
    });
    
});

describe('Database Test Demo', function () {
    describe('test successful connection', function () {
        // call the wrapper function to return our test function.  The wrapper returns
        // a function w/ the parameter we needed for async calls
        it('should connect without error', exampleFuncs.dbConnection());
    });
    
    describe('test returned object', function() { 
        it('should return our demo db entry', exampleFuncs.dbDemoRow())
        
    });
});

function ExampleTests() {
    this.dbConnection = function() {
        // we return the function containing our test, allows parameter passing
        // without executing the function (which we need for async tests)
        // if you don't need any parameters, you don't need the wrapper
        return function(done) {
            app.con.query("SELECT * FROM demo", function(err, rows) {
                if(err) {
                    done(err);  // test failed so we pass err to done
                } else {
                    done();  // test passed so we call done
                }
            });
        };
    };
    
    this.dbDemoRow = function () {
        return function(done) {
            app.con.query("SELECT id, test FROM demo", function(err, rows) {
                var context = {};
                if (err) { 
                    done(err); 
                } else {
                    context.row = rows[0];         
                    assert.equal(1, context.row.test);  // the value stored in our test field is 1
                    assert.equal(1, context.row.id);    // the id stored is also 1
                    done();                             // call done so mocha waits for async query result
                }
            }); 
        };
    };

    this.noWrapperExample = function() {
        // fake test demo'ing no wrapper needed since it's not async (see mocha tutorial)
        var happy = true;
        assert(true, happy);
    };
}