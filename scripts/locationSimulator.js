var app = require('../app').app;

function LocationPush(deviceId) {
    this.deviceId = deviceId;
    this.datatime = new Date();
    this.longitude = -122.85035;
    this.latitude = 45.46443;
    this.heartrate = 80;
}

LocationPush.prototype.randomize = function () {
    this.datatime = new Date();
    this.longitude += this.randomRange(0.001);
    this.latitude += this.randomRange(0.001);
    this.heartrate += Math.floor(this.randomRange(3));
    if (this.heartrate > 150) {
        this.heartrate = 150;
    }
    if (this.heartrate < 50) {
        this.heartrate = 50;
    }
    return this;
};

LocationPush.prototype.randomRange = function (range) {
    var sign = Math.random();
    if (sign < 0.5) {
        sign = -1;
    } else {
        sign = 1
    }
    var magnitude = (Math.random() * range);
    return sign * magnitude;
};

// closure captures scope of app and obj in the returned function
LocationPush.prototype.postLocation = function (app) {
    var self = this;
    return function () {
        app.con.query(app.queryBuilder.add.deviceData(self.randomize(), app.con), function (err, res) {
            if (err) {return err;}
        });
    }
};

module.exports = {
    executeAll: function () {
        app.con.query(app.queryBuilder.view.allDevices(), function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                for (var idx in rows) {
                    if (rows.hasOwnProperty(idx)) {
                        var device = new LocationPush(rows[idx].id);
                        setInterval(device.postLocation(app), app.locals.deviceInterval);
                    }
                }
            }
        });
    },
    executeNew: function(id) {
        var device = new LocationPush(id);
        setInterval(device.postLocation(app), app.locals.deviceInterval);
    },
    LocationPush: LocationPush
};