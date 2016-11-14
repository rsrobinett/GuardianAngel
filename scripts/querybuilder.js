module.exports = {

// queryBuilder is where we will build the sql queries, You will be provided
// with a queryBuilder function that you use to get a string of the sql command you
// need.  All value escaping is handled in the query builder
    
    queryBuilder: {
        view: {
            // this is live from our demo table
            demo: function() {
                return 'SELECT id, test FROM demo';
            }
        
        }
        
        /*
        DoesUserNameExist(Username);
            select count(*) from Guardian where username='2';
        CreateGuardian(Username, Password);
            insert into 
            Guardian
            (username, password)
            values ('username'','password');    
        GetIdForUsernamePassword(Username, Password);
            select * from Guardian where username = '1' and password = 'password';
        GetLatestDeviceData(GuardianId, DeviceId);
            select  d.name, dd.* from DeviceData dd
            inner join Device_Guardian dg on dd.deviceid = dg.deviceid
            inner join Guardian g on g.id = dg.guardianid
            inner join Device d on dg.deviceid = d.id
            --where dd.deviceid = 1 and g.id = 1;
            where dd.deviceid = <deviceid> and g.id = <GuardianID>;
        CreateDevice(Device);
            Mysql
            insert ignore into Device (name) values ('child2');
            SqlServer
            insert into Device (name) 
            values ('child2')
            Where not exists (select * from Device where name = 'child2');
        CreateDeviceGuardianPairing(Device,Guardian);
            insert into Device_Guardian
            (guardianid, deviceid)
            values (1, 1);  
        InsertDeviceData(DeviceID, DataTime, Longitude, Latitude, HeartRate);
            insert into DeviceData (deviceid, datatime, longitude, latitude, heartrate)
            values (<deviceid>, <datatime>, <longitude>, <latitude>, <heartrate)>; 
        */
        //  THESE ARE EXAMPLES
        // add: {
        //     workouts: function(body, con) {
        //         return 'INSERT INTO workouts (name, reps, weight, date, lbs) ' +
        //             'VALUES (' + con.escape(body.name) + ', ' + con.escape(body.reps) + ', ' + con.escape(body.weight) +
        //             ', ' + con.escape(body.date) + ', ' + con.escape(body.lbs) + ')';
        //     }
        // },
        // delete: {
        //     workouts: function (body, con) {
        //         return 'DELETE FROM workouts WHERE workouts.id = ' + con.escape(body.id);
        //     }
        // },
        // edit: {
        //     workouts: function (body, con) {
        //         return 'UPDATE workouts w ' +
        //             'SET w.name = ' + con.escape(body.name) + ', w.reps = ' + con.escape(body.reps) + ', w.weight = ' +
        //             con.escape(body.weight) + ', w.date = ' + con.escape(body.date) + ', w.lbs = ' + con.escape(body.lbs) +
        //             ' WHERE w.id = ' + con.escape(body.id);
        //     }
        // }
    }
};