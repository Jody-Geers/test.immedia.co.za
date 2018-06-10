# test-inmedia.co.za

  PHP Web Dev Test.

  Javascript client application using Ajax HTTP JSON to a PHP data service persisting to a MySQL database.

  Admittedly I ran out of time for the Foursquare and Flickr API integrations. . .  :(

  The client is a single page javascript application.

    Jquery for DOM manipulation & AJAX ( https://jquery.com/ )
    Browserify for application builds ( http://browserify.org/ )
    No other frame works, pretty vanilla javascript and light weight.
    Custom architecture but heavily influced by current tech trend and node.js community.

  The server is a REST influenced data service PHP application.
  
    No frame works, vanilla PHP.
    Custom architecture but heavily influced by current tech trend and Java Spring community.


  Currently @ http://localhost:8888/ left UI Widget pane allows user to search for location.
  
  Location is stored to database on server.
  
  Middle UI Widget pane lists previous and current search.
  
  Selection of location list item in middle UI Widget pane opens relating images in right UI Widget pane...

## Installation

  There is a .sql file at /_bin/database/ for a MySQL database setup.

  Stick it in MAMP / LAMP / WAMP, running serving from port 8888.

  Client at http://localhost:8888/ should then run fine.

  There is a server config file at : /api/config/config.php for MySQL database connection.

  Everything from then on should be smooth sailing.

  ![alt text](/bin/screenie.png)
  
## License

  MIT




