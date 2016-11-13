module.exports = {
    
    globals : {
        title : "Guardian Angel",
        description : "Keep watch over your child"
    },
    
    exampleConfigValue : "some value",
    
    db: {
        
        use: true,
    },
    
    // should move db values to it's own config. 
    // dbLogin is just our database login credentials for c9 and AWS
    dbLogin: {
        c9: {
            // Make sure this is updated to your c9 build
            host: '127.0.0.1',
            port: '3306',
            user: 'zduerr',
            database: 'c9'
        },

        dbEC2: {
            connectionLimit: 10,
            host: 'localhost',
            user: 'student',
            password: 'default',
            database: 'student'
        }
    }
};