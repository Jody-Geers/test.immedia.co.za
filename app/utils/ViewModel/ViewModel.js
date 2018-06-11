

/**
 * ViewModel Utils
 * @returns {obj} ViewModel
 * @access public
 */
function ViewModel() {
	
	
	/**
	 * Bind a model to view
	 * @param {string} html list
	 * @param {string} html listItem
	 * @param {arr} ctx - model object
	 * @return {string} html view
	 * @access public
	 */
	this.bindDataToListUi = function( list, listItem, ctx ) {

		// return
		var returnUi = '';

		// bind items
		var listItemUi = '';

		for ( var ctxKey in ctx ) {

			listItemUi += this.bindDataToUi( listItem, ctx[ctxKey] );

		}

		// build
		returnUi = list.replace( new RegExp( '%list-items%', 'g' ), listItemUi );

		// return
		return returnUi;

	}
	
	
	/**
	 * Bind a model to view
	 * @param {string} html view
	 * @param {obj} ctx - model object
	 * @return {string} html view
	 * @access public
	 */
	this.bindDataToUi = function( ui, ctx ) {
		
		// return
		var returnUi = ui;
		
		// bind
		for ( var ctxKey in ctx ) {
			
			// jog on
			if ( ctxKey === 'meta' ) {
				continue;
			}
			
			// nothing to see here folks . . .
			if ( !ctx[ctxKey] ) ctx[ctxKey] = '';
			
			// bind ze datar!
			returnUi = returnUi.replace( new RegExp( '%' + ctxKey + '%', 'g' ), ctx[ctxKey] );
			
		}
		
		// return UI
		return returnUi;
		
		
	};
	
	
	/**
	 * Gets a model from a view
	 * @param {el} el
	 * @param {obj} ctx - model object
	 * @access public
	 */
	this.getDataFromUi = function( el, ctx ) {
		
		// return
		var returnCtx = ctx;
		
		// bind
		for ( var ctxKey in ctx ) {
			
			// jog on
			if ( ctxKey === 'meta' ) {
				continue;
			}
			
			if ( el.find( '#' + ctxKey ).length === 0 ) {
				continue;
			}

			returnCtx[ctxKey] = el.find( '#' + ctxKey ).val().trim();
			
		}
		
		// return UI
		return returnCtx;
		
		
	};
	
	
};


module.exports = new ViewModel();