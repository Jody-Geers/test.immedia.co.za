

/**
 * LocationPrevious Controller
 * @returns {class} LocationPrevious
 * @access public
 */
function LocationPrevious() {
	
	
	// private dependencys
	var _utils = require( '../../utils/utils.js' );
	var _views = require( '../../views/views.js' );
	var _models = require( '../../models/models.js' );


	// propertys
	this.callbackCache = null;


	/**
	 * Location Previous Form / Widget
	 * @param {el} el - dom
	 * @param {obj} locationPrevious - ctx
	 * @param {funct} cb - callback
	 * @access public
	 */
	this.setViewList = function( el, locationPrevious, cb ) {

		// cache?
		window.LocationPrevious.callbackCache = cb;
		
		// views
		var content = _views.LocationPrevious.content;
		var list = _views.List.list;
		var listItem = _views.Location.listItem;

		
		// bind views
		var listItem = listItem.replace( new RegExp( '%function%', 'g' ), 'LocationPrevious.handleDoSelectLocationPreviousUi' );
		
		// view model
		var contentViewBound = _utils.ViewModel.bindDataToListUi( list, listItem, ( locationPrevious || [ new _models.Location() ] ) );
		
		// bind views
		contentViewBound = content.replace( new RegExp( '%location-previous-list%', 'g' ), contentViewBound );

		// set UI
		el.html( _utils.Stringz.bindStringsToUi( contentViewBound ) );
		
	};
	
	
	/**
	 * Location Previous List / Widget
	 * @param {el} el - dom
	 * @param {arr} cache - to update
	 * @param {arr} locationPrevious - ctx
	 * @param {funct} cb - callback
	 * @access public
	 */
	this.handleSetViewList = function( el, cache, cb ) {

		// cache?
		window.LocationPrevious.callbackCache = cb;

		// get data
		_utils.Store.get( new _models.Location(), function( err, locationPreviousRes ) {

			// update cache
			for ( var locationPreviousResKey in locationPreviousRes ) {

				cache.push( locationPreviousRes[locationPreviousResKey] );

			}

			// update UI
			window.LocationPrevious.setViewList( el, locationPreviousRes, cb );

		});
		
	};
	
	
	/**
	 * UI Behaviour
	 * Select a location item
	 * @param {el} el - invoker
	 * @access public 
	 */
	this.handleDoSelectLocationPreviousUi = function( el ) {

		window.LocationPrevious.callbackCache( $( el ).attr( 'id' ) );

	}
	
	
    /**
     * Make conroller visible
     * @access public
     */
    window.LocationPrevious = this;
    
    
};


module.exports = LocationPrevious;