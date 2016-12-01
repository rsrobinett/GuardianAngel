module.exports = {

// queryBuilder is where we will build the sql queries, You will be provided
// with a queryBuilder function that you use to get a string of the sql command you
// need.  All value escaping is handled in the query builder
    
    queryBuilder: {
        view: {

            latestLocation: function(body, con) {
                return 'select d.Name as name, dd.DataTime as datatime, dd.Longitude as longitude, dd.Latitude ' +
                    'as latitude, dd.HeartRate as heartrate from DeviceData dd ' +
            'inner join Device_Guardian dg on dd.DeviceId = dg.DeviceId ' +
            'inner join Guardian g on g.id = dg.GuardianId ' +
            'inner join device d on dg.DeviceId = d.Id ' +
            'where g.username=' + con.escape(body.username) +
            ' ORDER BY dd.DataTime DESC LIMIT 1';
            },
            
            usernameByUsernamePass: function (body, con) {
                return 'select id, username, password from Guardian where username = '+
                con.escape(body.username) + ' and Password = ' + con.escape(body.password);
            
            },
            
            userExists: function (body, con) {
                return 'select count(*) as count from Guardian where username=' + con.escape(body.username);
            },

            allDevices: function () {
                return 'select Id as id, Name as name from device';
            },

            childDevice: function (body, con) {
                return 'select Id as id from device where name=' + con.escape(body.child);
            },

            locationHistory: function (body, con) {
                return 'select dd.DataTime as datatime, dd.Longitude as longitude, dd.Latitude as latitude, ' +
                'dd.HeartRate as heartrate FROM  DeviceData dd ' +
                'INNER JOIN Device_Guardian dg ON dd.DeviceID = dg.DeviceId ' +
                'INNER JOIN Guardian g ON dg.GuardianId = g.id ' +
                'WHERE g.username =' + con.escape(body.username) +
                    ' ORDER BY datatime DESC';
            }
        },
        
        add : {
            guardian: function(body, con) {
                return 'insert into Guardian (username, password) values (' +
                con.escape(body.username) + ', ' + con.escape(body.password) + ')';
            },
            
            deviceGuardianPair: function(body, con) {
                return 'insert into Device_Guardian (GuardianId, DeviceId) values ('
                + con.escape(body.guardianId) + ', ' + con.escape(body.deviceId) + ')';
            },
            
            deviceData: function(body, con) {
                return 'insert into DeviceData (DeviceId, DataTime, Longitude, Latitude, HeartRate) ' +
                'values (' + con.escape(body.deviceId) + ', ' + con.escape(body.datatime) + ', ' +
                con.escape(body.longitude) + ', ' + con.escape(body.latitude) + ', ' +
                con.escape(body.heartrate) + ')'; 
            },
            
            device: function(body, con) {
                return 'insert into device (Name) values (' + con.escape(body.child) + ')';
            }
        }
    }
};      
