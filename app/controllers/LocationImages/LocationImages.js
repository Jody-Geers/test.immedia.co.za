

/**
 * LocationImage Controller
 * @returns {class} LocationImage
 * @access public
 */
function LocationImages() {
	
	
	// private dependencys
	var _utils = require( '../../utils/utils.js' );
	var _views = require( '../../views/views.js' );
	var _models = require( '../../models/models.js' );


	// propertys
	this.callbackCache = null;
	
	
	/**
	 * Location Image Form / Widget
	 * @param {el} el - dom
	 * @param {obj} location - ctx
	 * @param {funct} cb - callback
	 * @access public
	 */
	this.setView = function( el, location, cb ) {

		// cache?
		window.LocationImages.callbackCache = cb;
		
		// views
		var content = _views.LocationImages.content;
		
		// bind views
		var contentView = content.replace( new RegExp( '%location-images-list%', 'g' ), '%stringz_locationimages_locationbasedimages%' );
		
		// view model
		var contentViewBound = _utils.ViewModel.bindDataToUi( contentView, ( location || new _models.Location() ) );
		
		// set UI
		el.html( _utils.Stringz.bindStringsToUi( contentViewBound ) );
		
	};
	
	
    /**
     * Make conroller visible
     * @access public
     */
    window.LocationImages = this;
    
    
};


module.exports = LocationImages;