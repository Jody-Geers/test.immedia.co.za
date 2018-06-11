


/*
* immedia db structure
* 180608 / 01
*/



DROP DATABASE IF EXISTS immedia;

CREATE DATABASE IF NOT EXISTS immedia;

USE immedia;



/*
* im_location
* Location Searches
*/

DROP TABLE IF EXISTS im_location;

CREATE TABLE im_location (

	im_location_id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY ( im_location_id ),

	im_location_name VARCHAR( 100 ) NULL,
	im_location_lat DECIMAL(10, 8) NULL,
	im_location_lng DECIMAL(11, 8) NULL,
	im_location_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
	im_location_active TINYINT( 1 ) NOT NULL DEFAULT TRUE
	
);

DESCRIBE im_location;

SELECT * FROM im_location;



/*
* Show list of tables as confirmation.
*/

SHOW TABLES;



