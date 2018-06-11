

/**
 * Store Utils
 * @returns {obj} Store
 * @access public
 */
function Store() {


	var _API_URL = 'http://localhost:8888/api/';
	// var _API_URL = 'https://www.livelocation.com/api/';
	
	
	/**
	 * Blast off an object into space!
	 * @param {obj} ctx req
	 * @param {funct} cb - say whhaaaaa?!
	 * @return {obj} ctx res
	 * @access public
	 */
	this.get = function( ctx, cb ) {

		// http get url
		var getReqUrl = '?type=' + ctx.meta.storeName;

		// build get req
		for ( var ctxKey in ctx ) {
			
			// jog on
			if ( ctxKey === 'meta' || ctx[ctxKey] === undefined ) {
				continue;
			}

			getReqUrl += '&' + ctxKey + '=' + ctx[ctxKey];

		}
		
		// get sum!
		$.ajax({
			
			url: _API_URL + getReqUrl,
			method: 'GET'
			
		}).done( function( res ) {
			
			// TODO: parse response to their applicable model objects
			cb( null, JSON.parse( res ) );
			
		}).fail( function( res ) {

			// TODO: store level error handling
			cb( res.status + ' // ' + res.responseText, null );
			
		});
		
	};
	
	
};


module.exports = new Store();