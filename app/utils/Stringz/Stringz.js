

/**
 * Stringz Utils
 * @returns {obj} Stringz
 * @access public
 */
function Stringz() {
	
	
	// private dependencys
	var _stringzEn = require( './stringz-en.js' );
	
	
	/**
	 * Bind stringz to view
	 * @param {string} ui - html view
	 * @access public
	 */
	this.bindStringsToUi = function( ui ) {
		
		// return
		var returnUi = ui;
		
		// local - TODO: user settings
		var myLanguageSettingIsEnglish = true;
		
		if ( myLanguageSettingIsEnglish) stringz = _stringzEn;
		
		// bind
		for ( stringzKey in stringz ) {
			
			returnUi = returnUi.replace( new RegExp( stringz[stringzKey].stringz_key, 'g' ), stringz[stringzKey].stringz_content );
			
		}
		
		// return UI
		return returnUi;
		
		
	};
	
	
};


module.exports = new Stringz();