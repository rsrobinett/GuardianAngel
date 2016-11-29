module.exports = function (app) {
    app.passport = require('passport');
    app.Strategy = require('passport-local').Strategy;

    app.passport.use(new app.Strategy(
        function (username, password, done) {
            var body = {};
            body.username = username;
            body.password = password;
            app.con.query(app.queryBuilder.view.usernameByUsernamePass(body, app.con), function (err, rows) {
                if (err) {
                    return done(err);
                }
                if (rows.length == 0) {
                    return done(null, false);
                }
                return done(null, rows[0]);
            });
        }
    ));

    app.passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    app.passport.deserializeUser(function(id, done) {
        app.con.query("select * from Guardian where id = ?", [id] , function(err,rows){
            done(err, rows[0]);
        });
    });

    app.use(app.passport.initialize());
    app.use(app.passport.session());
};
