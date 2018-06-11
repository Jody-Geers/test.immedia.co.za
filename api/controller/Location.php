<?php


require_once( 'AbstractController.php' );
require_once( 'service/LocationService.php' );


/**
* Class
* @access public
*/
class Location extends AbstractController {

	
	public $isPublic = null;
	public $canGetAll = null;
 	public $service = null;
	
	
    public function __construct() {
	// public function Location () {
	
		$this->isPublic = true;
		$this->canGetAll = true;
 		$this->service = new LocationService();
		
	}

	
	/**
	* Gets Location Data
	* @param {obj} $args - Location
	* @return {array} Location || {obj} Location
	* @access public
	*/
	public function doGet( $args ) {

		// GET all
		if ( empty( $args ) ) {

			// validation - can get all
			if ( $this->canGetAll === false ) return ( object )array( 'err' => 'HTTP/1.1 403 Forbidden', 'errCode' => 403 );

			return $this->service->get();
			
		}
		
		// validation - remove foreign propertys
		$typeReqObj = ( !empty( $args ) )? $this->service->createModelObj( $args ) : $args;

		// validation - remove '' propertys - empty params
		$typeReqObj = ( object ) array_filter( ( array ) $typeReqObj );
		
		if ( empty( ( array )$typeReqObj ) ) return ( object )array( 'err' => 'HTTP/1.1 400 Bad Request', 'errCode' => 400 );

		// API GET Location Request
		// If nothing found, return emptyness [] to user.
		// Else, save search and return result.

		// Save location search
		return $this->doPost( $typeReqObj );

	}
	
	
	// /**
	//  * !!!!! NO FUNCTIONALIY NEEDED ABOVE WHAT ABSTRACT PROVIDES !!!!!
	//  *
	//  * Saves Location Data
	//  * @param {obj} $args - Location
	//  * @return {object} Location
	//  * @access private
	//  */
	// public function doPost( $args ) {
		
	// 	// not accessible
	// 	return ( object )array( 'err' => 'HTTP/1.1 403 Forbidden', 'errCode' => 403 );
		
	// }
	
	
}


?>
