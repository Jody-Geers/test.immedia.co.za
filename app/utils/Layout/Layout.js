

/**
 * Layout Utils
 * @returns {obj} layout
 * @access public
 */
function Layout() {
	
	
	/**
	 * Is view window in landscape mode?
	 * @return {bool}
	 * @access public
	 */
	this.isLayoutLand = function() {
		
		// TODO: there be dragons!
		return true;
		
	};
	
	
};


module.exports = new Layout();