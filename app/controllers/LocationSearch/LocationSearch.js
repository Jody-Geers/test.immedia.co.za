

/**
 * LocationSearch Controller
 * @returns {class} LocationSearch
 * @access public
 */
function LocationSearch() {
	
	
	// private dependencys
	var _utils = require( '../../utils/utils.js' );
	var _views = require( '../../views/views.js' );
	var _models = require( '../../models/models.js' );


	// propertys
	this.callbackCache = null;
	
	
	/**
	 * Location Search Form / Widget
	 * @param {el} el - dom
	 * @param {obj} locationSearch - ctx
	 * @param {funct} cb - callback
	 * @access public
	 */
	this.setViewForm = function( el, locationSearch, cb ) {

		// cache?
		window.LocationSearch.callbackCache = cb;
		
		// views
		var content = _views.LocationSearch.content;
		var form = _views.Location.form;
		
		// bind views
		var contentView = content.replace( new RegExp( '%location-search-form%', 'g' ), form );
		
		// view model
		var contentViewBound = _utils.ViewModel.bindDataToUi( contentView, ( locationSearch || new _models.Location() ) );
		
		// set UI
		el.html( _utils.Stringz.bindStringsToUi( contentViewBound ) );
		
	};
	
	
	/**
	 * UI Behaviour
	 * Get Location input form stuffs
	 * @param {el} el - invoker
	 * @access public 
	 */
	this.handleDoLocationSearchUi = function( el ) {
		
		// view model
		var locationSearch = _utils.ViewModel.getDataFromUi( $( '#location-search' ), new _models.Location() );
		
		// validation
		if ( !locationSearch.location_name || locationSearch.location_name === '' ) {
			
			_utils.Validation.setUiFailed( $( '#location-search' ), [ 'location_name' ] );
		
			return;
		
		}
		
		_utils.Validation.setUiPassed( $( '#location-search' ), [ 'location_name' ] );
		
		// server time!
		window.LocationSearch.handleDoLocationSearchReq( locationSearch );
		
	}


	/**
	 * Send off locationSearch to Server
	 * @param {obj} locationSearch
	 * @access public 
	 */
	this.handleDoLocationSearchReq = function( locationSearch ) {
		
		// send it off!
		_utils.Store.get( locationSearch, function( err, locationSearchRes ) {

			// hand to callback?
			if ( window.LocationSearch.callbackCache )
				window.LocationSearch.callbackCache( err, locationSearchRes );

			// update UI

		} );
		
	}
	
	
    /**
     * Make conroller visible
     * @access public
     */
    window.LocationSearch = this;
    
    
};


module.exports = LocationSearch;