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
                return 'insert into DeviceData (serialnumber, datatime, longitude, latitude, heartrate) ' +
                'values (' + con.escape(body.serialnumber) + ', ' + con.escape(body.datatime) + ', ' +
                con.escape(body.longitude) + ', ' + con.escape(body.latitude) + ', ' +
                con.escape(body.heartrate) + ')'; 
                
            },
            
            createDevice: function(body, con) {
                return 'insert into Device (serialnumber, name) values (' + con.escape(body.serialnumber) + ','
                + con.escape(body.child || body.serialnumber) + ') Where not exists (select * from Device where serialnumber = ' 
                + con.escape(body.serialnumber) + ')';
                
            }
        }
    }
};      
