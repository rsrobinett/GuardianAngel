module.exports = {
    
    globals : {
        title : "Guardian Angel",
        description : "Keep watch over your child",
        deviceInterval: 1000 * 60 * 5,   // 1hr
        redirect: function(route) {
            return {
                successReturnToOrRedirect: route,
                failureRedirect: '/login'
            };
        },
        isValidReq: function (expect, has) {
            for (var property in expect) {
                // (property exists in expect) and [(exists in has and is null/empty) or (does not exists in has)]
                if (expect.hasOwnProperty(property) && ((has.hasOwnProperty(property) && (has[property] == null
                    || has[property] == "")) || !has.hasOwnProperty(property))){
                    return false;
                }
            }
            return true;
        },

        mocha: {
            username: 'mochauser',
            password: 'mochapass',
            child: 'mochachild',
            deviceID: 1
        }
    },

    db: {
        use: true
    },
    
    // should move db values to it's own config. 
    // dbLogin is just our database login credentials for c9 and AWS
    dbLogin: {
        c9: {
            host: '127.0.0.1',
            port: '3306',
            user: 'zduerr',
            database: 'c9',
            multipleStatements: true
        },
            // Make sure this is updated to your c9 build
        //     host: 'rachelle-guardian_angel-4014002', 
        //     port: '3306',
        //     user: 'rachelle',
        //     database: 'c9'
        // },

        ec2: {
            connectionLimit: 10,
            host: 'localhost',
            user: 'student',
            password: 'default',
            database: 'student',
            multipleStatements: true
        },
        local: {
            connectionLimit: 10,
            host: 'localhost',
            port: '8889',
            user: 'zach',
            password: 'H5qsadBGTuuXyJGG',
            database: 'cs290',
            multipleStatements: true
        }
    },

    mapKey: "AIzaSyAmfNdzvBzM5eUew6Y3C1b5lfyljjSKFuE",
    staticKey: 'AIzaSyAThE04V7bz_9gcqSrOwGofzCWqYjzfyr8'
};
