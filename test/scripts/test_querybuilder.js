var assert = require('assert');         // allows use of assert
var app = require('../../app.js').app;     // scope the app to the test suite
var qb = app.queryBuilder;

describe('Queries', function () {
    describe('View Queries', function () {
        it('should create correct latest location mysql query', function () {
            var body = {};
            body.username = 'username';
            var expect = 'select d.Name as name, dd.DataTime as datatime, dd.Longitude as longitude, dd.Latitude as ' +
                'latitude, dd.HeartRate as heartrate from DeviceData dd ' +
                'inner join Device_Guardian dg on dd.DeviceId = dg.DeviceId ' +
                'inner join Guardian g on g.id = dg.GuardianId ' +
                'inner join device d on dg.DeviceId = d.Id ' +
                'where g.username=' + "'username'" +
                ' ORDER BY dd.DataTime DESC LIMIT 1';
            var actual = qb.view.latestLocation(body, app.con);
            assert(expect == actual);
        });
        it('should create correct usernameByUsernamePass mysql query', function () {
            var body = {};
            body.username = 'username';
            body.password = 'password';
            var expect = 'select id, username, password from Guardian where username = ' +
                "'username'" + ' and Password = ' + "'password'";
            var actual = qb.view.usernameByUsernamePass(body, app.con);
            assert(expect == actual);
        });
        it('should create correct userExists mysql query', function () {
            var body = {};
            body.username = 'username';
            var expect = 'select count(*) as count from Guardian where username=' + "'username'";
            var actual = qb.view.userExists(body, app.con);
            assert(expect == actual);
        });

        it('should create correct allDevices mysql query', function () {
            var expect = 'select Id as id, Name as name from device';
            var actual = qb.view.allDevices();
            assert(expect == actual);
        });

        it('should create correct view location history query', function () {
            var body = {};
            body.username = 'username';
            var expect = 'select dd.DataTime as datatime, dd.Longitude as longitude, dd.Latitude as latitude, ' +
            'dd.HeartRate as heartrate FROM  DeviceData dd ' +
            'INNER JOIN Device_Guardian dg ON dd.DeviceID = dg.DeviceId ' +
            'INNER JOIN Guardian g ON dg.GuardianId = g.id ' +
            'WHERE g.username =' + "'username'" + ' ORDER BY datatime DESC';
            var actual = qb.view.locationHistory(body, app.con);
            assert(expect == actual);
        })
    });

    describe('Add Queries', function () {
        it('should create correct add guardian mysql query', function () {
            var body = {};
            body.username = 'username';
            body.password = 'password';
            var expect = 'insert into Guardian (username, password) values (' +
                "'username'" + ', ' + "'password'" + ')';
            var actual = qb.add.guardian(body, app.con);
            assert(expect == actual);
        });
        it('should create correct add deviceGuardianPair mysql query', function () {
            var body = {};
            body.guardianId = 'gid';
            body.deviceId = 'did';
            var expect = 'insert into Device_Guardian (GuardianId, DeviceId) values (' +
                "'gid'" + ', ' + "'did'" + ')';
            var actual = qb.add.deviceGuardianPair(body, app.con);
            assert(expect == actual);
        });
        it('should create correct add deviceData mysql query', function () {
            var body = {};
            body.deviceId = 'did';
            body.datatime = '1970-01-01 00:00:00.000';
            body.latitude = 1;
            body.longitude = 1;
            body.heartrate = 1;

            var expect = 'insert into DeviceData (DeviceId, DataTime, Longitude, Latitude, HeartRate) ' +
                "values ('did'" + ', ' + "'1970-01-01 00:00:00.000'" + ', ' +
                '1' + ', ' + '1' + ', ' + '1' + ')';
            var actual = qb.add.deviceData(body, app.con);
            assert(expect == actual, "Expected:" + expect.valueOf() +"|| Actual:" + actual.valueOf());
        });

        it('should create correct add device mysql query', function () {
            var body = {};
            body.child = 'child';
            var expect = 'insert into device (Name) values (' + "'child'" + ')';
            var actual = qb.add.device(body, app.con);
            assert(expect == actual);
        });
    });
});
