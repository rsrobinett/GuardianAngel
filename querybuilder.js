module.exports = {

// queryBuilder is where we will build the sql queries, You will be provided
// with a queryBuilder function that you use to get a string of the sql command you
// need.  All value escaping is handled in the query builder
    
    queryBuilder: {
        view: {
            // this is live from our demo table
            demo: function() {
                return 'SELECT * FROM demo';
            }
        }
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