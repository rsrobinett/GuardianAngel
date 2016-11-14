use c9

Create Table 
if not exists 
Guardian
(
Id int NOT NULL AUTO_INCREMENT,
Username varchar(255) NOT NULL UNIQUE,
Password varchar(255) NOT NULL,
PRIMARY KEY(Id)
);

create table 
if not exists 
Device
(
Id int NOT NULL AUTO_INCREMENT,
Name varchar(255) NOT NULL UNIQUE,
PRIMARY KEY(id)
);

create table 
if not exists 
Device_Guardian
(
GuardianId int not null,
DeviceId int not null,
FOREIGN KEY(GuardianId) REFERENCES Guardian(ID),
FOREIGN KEY(DeviceId) REFERENCES Device(ID),
PRIMARY KEY(GuardianId, DeviceId)
);

create table 
if not exists 
DeviceData(
Id int NOT NULL AUTO_INCREMENT,
DeviceID int NOT NULL,
DataTime DATETIME NOT NULL,
Longitude FLOAT( 10, 6 ),
Latitude FLOAT( 10, 6 ),
HeartRate DOUBLE,
PRIMARY Key(id),
FOREIGN KEY(DeviceId) REFERENCES Device(ID)
);

insert into 
Guardian
(username, password)
values (1,'password');

insert into Device
(name)
values ('child1');

insert into Device_Guardian
(guardianid, deviceid)
values ((select id from Guardian limit 1), (select id from Device limit 1));

insert into DeviceData (deviceid, datatime, longitude, latitude, heartrate)
values ((select id from Device limit 1),'2016-11-13 3:08', 45.464430, -122.850351, 100.99);

select * from Device_Guardian;
select * from DeviceData;
select * from Guardian;
select * from Device;
/* 
delete from Device_Guardian;
delete from DeviceData;
delete from Guardian;
delete from Device;

Drop Table Device_Guardian;
Drop Table DeviceData;
Drop Table Guardian;
Drop Table Device;
*/

