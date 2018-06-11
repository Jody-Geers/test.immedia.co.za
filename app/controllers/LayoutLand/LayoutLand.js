

/**
 * LayoutLand Controller
 * @returns {class} LayoutLand
 * @access public
 */
function LayoutLand() {
	
	
	// private dependencys
	var _views = require( '../../views/views.js' );
	
	
	/**
	 * Landscape layout wrapper
	 * @return {string} html view
	 * @access public
	 */
	this.handleGetViewWrapper = function() {
		
		// views
		var wrapper = _views.LayoutLand.wrapper;
		
		// view model
		// ...
		
		// return UI
		return wrapper
		
		
	};
	
	
};


module.exports = LayoutLand;