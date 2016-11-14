module.exports = {

// queryBuilder is where we will build the sql queries, You will be provided
// with a queryBuilder function that you use to get a string of the sql command you
// need.  All value escaping is handled in the query builder
    
    queryBuilder: {
        view: {
            // this is live from our demo table
            demo: function() {
                return 'SELECT id, test FROM demo';
            },
            
            latestLocation: function(body, con) {
                return 'select  d.name, dd.* from DeviceData dd ' +
            'inner join Device_Guardian dg on dd.deviceid = dg.deviceid ' +
            'inner join Guardian g on g.id = dg.guardianid ' +
            'inner join Device d on dg.deviceid = d.id ' +
            'where dd.deviceid = ' + con.escape(body.deviceId) + ' and ' +
            'g.id = ' + con.escape(body.guardianId);
            },
            
            guardianIdByUsernamePass: function (body, con) {
                return 'select * from Guardian where username = '+
                con.escape(body.username) + ' and password = ' + con.escape(body.password);    
            
            },
            
            isValidUsername: function (body, con) {
                return 'select count(*) from Guardian where username=' + con.escape(body.username);
            }
        },
        
        add : {
            guardian: function(body, con) {
                return 'insert into Guardian (username, password) values (' +
                con.escape(body.username) + ', ' + con.escape(body.password) + ')';
            },
            
            deviceGuardianPair: function(body, con) {
                return 'insert into Device_Guardian (guardianid, deviceid) values (' +
                + con.escape(body.guardianId) + ', ' + con.escape(body.deviceId) + ')';
            },
            
            deviceData: function(body, con) {
                return 'insert into DeviceData (deviceid, datatime, longitude, latitude, heartrate) ' +
                'values (' + con.escape(body.deviceId) + ', ' + con.escape(body.dataTime) + ', ' +
                con.escape(body.longitude) + ', ' + con.escape(body.latitude) + ', ' +
                con.escape(body.heartrate) + ')'; 
                
            },
            
            createDevice: function(body, con) {
                return 'insert into Device (name) values (' + con.escape(body.child) +
                ') Where not exists (select * from Device where name = ' + con.escape(body.child) +
                ')';
                
            }
        }
    }
};      
        /*
        DoesUserNameExist(Username);
            select count(*) from Guardian where username='2';
        //CreateGuardian(Username, Password);
            insert into 
            Guardian
            (username, password)
            values ('username'','password');    
        //GetIdForUsernamePassword(Username, Password);
            select * from Guardian where username = '1' and password = 'password';
        //GetLatestDeviceData(GuardianId, DeviceId);
            select  d.name, dd.* from DeviceData dd
            inner join Device_Guardian dg on dd.deviceid = dg.deviceid
            inner join Guardian g on g.id = dg.guardianid
            inner join Device d on dg.deviceid = d.id
            --where dd.deviceid = 1 and g.id = 1;
            where dd.deviceid = <deviceid> and g.id = <GuardianID>;
        //CreateDevice(Device);
            Mysql
            insert ignore into Device (name) values ('child2');
            SqlServer
            insert into Device (name) 
            values ('child2')
            Where not exists (select * from Device where name = 'child2');
        //CreateDeviceGuardianPairing(Device,Guardian);
            insert into Device_Guardian
            (guardianid, deviceid)
            values (1, 1);  
        //InsertDeviceData(DeviceID, DataTime, Longitude, Latitude, HeartRate);
            insert into DeviceData (deviceid, datatime, longitude, latitude, heartrate)
            values (<deviceid>, <datatime>, <longitude>, <latitude>, <heartrate)>; 
        */