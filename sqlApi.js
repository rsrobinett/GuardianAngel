
// This is where we will eventually build our sql API.

module.exports = function (app, con) {
    // EXAMPLES
    // //returns a list of all the rows in the workouts table
    // app.get('/api/view', function (req, res) {
    //     con.query(queryBuilder.view.workouts(), function (err, rows) {
    //         if (err) {
    //             res.sendStatus(500);
    //         }
    //         else {
    //             res.send(rows);
    //         }
    //     });
    // });

    // //add a new exercise, uses con.escape to handle sql injection and converts date str to proper format
    // app.post('/api/add', function (req, res) {
    //     req.body.date = req.body.date.slice(0, 10);
    //     con.query(queryBuilder.add.workouts(req.body, con), function (err, response) {
    //         if (err) {
    //             res.sendStatus(500);
    //         }
    //         else {
    //             res.send(response);
    //         }
    //     });
    // });

    // //edit a new exercise, uses con.escape to handle sql injection and converts date str to proper format
    // app.post('/api/edit', function (req, res) {
    //     req.body.date = req.body.date.slice(0, 10);
    //     con.query(queryBuilder.edit.workouts(req.body, con), function (err, response) {
    //         if (err) {
    //             res.sendStatus(500);
    //         }
    //         else {
    //             res.send(response);
    //         }
    //     });
    // });

    // //deletes selected exercise
    // app.post('/api/delete', function (req, res) {
    //     con.query(queryBuilder.delete.workouts(req.body, con), function (err, response) {
    //         if (err) {
    //             res.sendStatus(500);
    //         }
    //         else {
    //             res.send(response);
    //         }
    //     });
    // });
};