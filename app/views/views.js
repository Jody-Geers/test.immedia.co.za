

/*
* Views
*/


var fs = require( 'fs' );


/**
 * LayoutLand
 * @return {obj} views
 * @access public
 */
module.exports.LayoutLand = new function() {
	
	this.wrapper = fs.readFileSync( __dirname + '/LayoutLand/wrapper.html', 'utf8' );
	
};


/**
 * LocationSearch
 * @return {obj} views
 * @access public
 */
module.exports.LocationSearch = new function() {
	
	this.content = fs.readFileSync( __dirname + '/LocationSearch/content.html', 'utf8' );
	
};


/**
 * LocationPrevious
 * @return {obj} views
 * @access public
 */
module.exports.LocationPrevious = new function() {
	
	this.content = fs.readFileSync( __dirname + '/LocationPrevious/content.html', 'utf8' );
	
};


/**
 * LocationImages
 * @return {obj} views
 * @access public
 */
module.exports.LocationImages = new function() {
	
	this.content = fs.readFileSync( __dirname + '/LocationImages/content.html', 'utf8' );
	
};


/**
 * Location
 * @return {obj} views
 * @access public
 */
module.exports.Location = new function() {
	
	this.form = fs.readFileSync( __dirname + '/Location/form.html', 'utf8' );
	this.listItem = fs.readFileSync( __dirname + '/Location/list-item.html', 'utf8' );
	
};


/**
 * List
 * @return {obj} views
 * @access public
 */
module.exports.List = new function() {
	
	this.list = fs.readFileSync( __dirname + '/List/list.html', 'utf8' );
	
};