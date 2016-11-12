## Running the server
0) The first time you use the app you'll need to run "npm install". In c9.io you can do 
    this through the terminal (Alt + L).
 
1) Open `app.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node app.js

## Routing 
1) In app.js wire up the routes and view
    var xyz = require('./routes/xyz');
    app.use('/xyz', xyz);

2) Add a view xyz.handlebars file in the view folder
    see the  ## View section below for more detail here.

3) Add a xyz.js file in the routes folder    
    look at how the "example" files are setup

## Views

1) Put your views in the views folder, not the layouts folder.  Each view will
be what goes in the <body> </body> tags inside the main layout.  We can configure
this later if we need to change our main layout template.  Views must have the
.handlebars extension and to send the pages in node use .render like the example

## Public

1) If you need javascript for your view page, add the .js file to public/js.  
same for .css files.  Keep all .js and .css in sep files, one per view.  Bootstrap
is already included in the public/css folder.


## Structure

See the notes in app.js, sqlApi.js, and config.js for a general idea of the program
structure.

## Note Taking

Please leave a note on how to use a particular feature if it isn't obvious.
