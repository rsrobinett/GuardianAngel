## Running the server
0) The first time you use the app you'll need to run "npm install". In c9.io you can do 
    this through the terminal (Alt + L).
 
1)  In c9.io Open `app.js` and start the app by clicking on the "Run" button in the top menu. Make
    sure that the Command field says, Command: app.js

2) Alternatively you can launch the app from the Terminal:

    $ node app.js

3) To run locally, you will need to change "var port = process.env.PORT;" in the app.js file to 
    some port number for example "var port = 3508;".  
    When it is running you can hit it in your browser http://localhost:3508/example.
    Note: When the db is setup there may be connection issues.  

## Routing 
1) In app.js wire up the routes and view
    var xyz = require('./routes/xyz');
    app.use('/xyz', xyz);

2) Add a view xyz.handlebars file in the view folder
    see the  ## View section below for more detail here.

3) Add a xyz.js file in the routes folder    
    look at how the "example" files are setup

Note: routing may be different than you've used in previous classes, but keeping 
    them separated will work better for working in a team. 

## Views

1) Put your views in the views folder, not the layouts folder.  Each view will
be what goes in the <body> </body> tags inside the main layout.  We can configure
this later if we need to change our main layout template.  Views must have the
.handlebars extension and to send the pages in node use .render like the example

## Public

1) If you need javascript for your view page, add the .js file to public/js.  
same for .css files.  Keep all .js and .css in sep files, one per view.  Bootstrap
is already included in the public/css folder.

## Config Values and Global Variables

1) config.js has config values.  Look at example.js and example.handlebars to see 
how to use values in config.js 

2) config.js in globals section has global variables.  They can be access just 
    by the value directly.  See layout for an example.  


## Structure

Follow the sturcture of the "example" page for wiring up a new page.  
You'll need to add to app.js, create .js in routes folder and .handlebars in 
views folder. 

## Database

1)  The most recent pushed build of the database will be hosted on the AWS server
    and should be live.  
    
    

## Note Taking

Please leave a note on how to use a particular feature if it isn't obvious.

## Unit Tests

1)  Review https://mochajs.org/ for a tutorial on how to use mocha.  Each javascript
    file and/or view should have it's own test_filename.js file placed in the /test 
    directory.  The done function in the async examples is not actually defined 
    anywhere in the test. 