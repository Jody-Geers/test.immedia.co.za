

/*
* Application Core Dependencys
*/

var _utils = require( './utils/utils.js' );
var _controllers = require( './controllers/controllers.js' );


/*
* Application Core
*/
var layoutLand = new _controllers.LayoutLand();
var app = new _controllers.App();


/*
 * Init Application
 */

// device orientation?
if ( _utils.Layout.isLayoutLand() ) {
	
	var layout = layoutLand.handleGetViewWrapper();
	
} else {
	
	// not yet used.
	// TODO : utils.Layout.isLayoutLand()
	
}


/*
 * Set Layout
 */

// wrapper
$( '#main' ).html( layout );

// bring the noise!
app.init();



