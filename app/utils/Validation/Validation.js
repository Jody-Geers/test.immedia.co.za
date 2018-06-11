

/**
 * Validation Utils
 * @returns {obj} Validation
 * @access public
 */
function Validation() {
	
	
	/**
	 * Update UI items to be red horrible errorz!
	 * @param {el} el
	 * @param {array} props - ctx obj.propertys 
	 * @access public
	 */
	this.setUiFailed = function( el, props ) {
		
		// add validation class!
		for ( var propsKey in props ) {
			
			el.find( '#' + props[propsKey] ).addClass( 'border-red' );
			
		}
		
	};
	
	
	/**
	 * Never gonna give you up 
	 * Never gonna let you down 
	 * Never gonna run around and desert you . . .  
	 * @param {el} el
	 * @param {array} props - ctx obj.propertys 
	 * @access public
	 */
	this.setUiPassed = function( el, props ) {
		
		// add validation class!
		for ( var propsKey in props ) {
			
			el.find( '#' + props[propsKey] ).removeClass( 'border-red' );
			
		}
		
	};
	
	
};


module.exports = new Validation();