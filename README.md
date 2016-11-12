## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node server.js

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



