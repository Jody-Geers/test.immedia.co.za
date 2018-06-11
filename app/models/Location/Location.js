

/**
 * Location Model
 * @returns {obj} Location
 * @access public
 */
function Location( args ) {
	
    this.meta = {
        storeName: "Location",
        storeAffinity: "remote"
    };
    
    this.location_id = ( args )? args.location_id : undefined;

    this.location_name = ( args )? args.location_name : undefined;

    this.location_lat = ( args )? args.location_lat : undefined;

    this.location_lng = ( args )? args.location_lng : undefined;

    this.location_timestamp = ( args )? args.location_timestamp : undefined;
    
    this.location_active = ( args )? args.location_active : undefined;
		
};


module.exports = Location;