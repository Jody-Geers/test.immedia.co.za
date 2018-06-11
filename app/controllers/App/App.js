

/**
 * App Controller
 * @returns {class} App
 * @access public
 */
function App() {
	
	
	// private dependencys
	var _controllers = require( '../controllers.js' );


	// propertys
	this.dataLocationsCache = { location_search : [] };
	
	
	/**
	 * INIT
	 * @access public
	 */
	this.init = function() {

		var locationSearch = new _controllers.LocationSearch();
		var locationPrevious = new _controllers.LocationPrevious();
		var locationImages = new _controllers.LocationImages();
		
		// content blocks - location search.
		locationSearch.setViewForm( $( '#LocationSearch' ), null, function( err, locationSearchRes ) {
			
			if ( err ) {
				// handle error - dammit do something!
				alert( err );
				return;
			}

			// TODO: update #LocationSearch with error if no result

			// update location searches cache
			window.App.dataLocationsCache.location_search.push( locationSearchRes );
			
			// update #LocationPrevious with search and number of result
			locationPrevious.setViewList( $( '#LocationPrevious' ), window.App.dataLocationsCache.location_search, window.App.handleDoLocationSelectUi );

			// TODO: update #LocationPrevious with selected location item

			// TODO: update #LocationSearch refresh widget
			
		});


		// content blocks - location previous.
		locationPrevious.handleSetViewList( $( '#LocationPrevious' ), window.App.dataLocationsCache.location_search, window.App.handleDoLocationSelectUi );

		// content blocks - location images.
		LocationImages.setView( $( '#LocationImages' ), null, window.App.handleDoImageSelectUi );

	};
	
	
	/**
	 * UI Behaviour
	 * Select a location from previous list
	 * @param {int} locationId - invoker
	 * @access public 
	 */
	this.handleDoLocationSelectUi = function( locationId ) {

		// cache
		var locationSearch = window.App.dataLocationsCache.location_search;

		// get ctx item
		var location = {};

		for ( var locationSearchKey in locationSearch ) {

			if ( parseInt( locationSearch[locationSearchKey].location_id ) === parseInt( locationId ) ) {
				location = locationSearch[locationSearchKey];
				break;
			}

		}

		// content blocks - location images.
		var locationImages = new _controllers.LocationImages();

		LocationImages.setView( $( '#LocationImages' ), location, window.App.handleDoImageSelectUi );

	}


	/**
	 * UI Behaviour
	 * open image in a lightbox
	 */
	this.handleDoImageSelectUi = function() {

		//TODO: lots. . ..


	}
	
	
    /**
     * Make conroller visible
     * @access public
     */
    window.App = this;
    
    
};


module.exports = App;