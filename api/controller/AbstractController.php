<?php


/**
* Shared public controller API
*/
Abstract class AbstractController {

	
	/**
	* Gets Type Data
	* GET all || GET by primary key || GET by params
	* @param {obj} $args - Type
	* @return {array} Type || {obj} Type
	* @access public
	*/
	public function doGet( $args ) {
		
		// GET all
		if ( empty( $args ) ) {
			
			// validation - can get all
			if ( $this->canGetAll === false ) return ( object )array( 'err' => 'HTTP/1.1 403 Forbidden', 'errCode' => 403 );

			return $this->service->get();
			
		}
			
		// GET by primary key
		if ( count( $args ) === 1 && key( $args ) === strtolower( get_class( $this ) ) . '_id' ) {
			return $this->service->getByParams( $args )[0];
		}
		
		// validation - remove foreign propertys
		$typeReqObj = ( !empty( $args ) )? $this->service->createModelObj( $args ) : $args;

		// validation - remove '' propertys - empty params
		$typeReqObj = ( object ) array_filter( ( array ) $typeReqObj );
		
		if ( empty( ( array )$typeReqObj ) ) return ( object )array( 'err' => 'HTTP/1.1 400 Bad Request', 'errCode' => 400 );
		
		// GET by params
		return $this->service->getByParams( $typeReqObj );
		
	}
	
	
	/**
	 * Saves Type Data
	 * @param {obj} $args - Type
	 * @return {object} Type
	 * @access private
	 */
	public function doPost( $args ) {

		// validation - empty post
		if ( empty( $args ) ) {
			return ( object )array( 'err' => 'HTTP/1.1 400 Bad Request', 'errCode' => 400 );
		}
		
		// validation - remove foreign propertys
		$typeReqObj = ( !empty( $args ) )? $this->service->createModelObj( $args ) : $args;

		// validation - remove '' propertys - empty params
		$typeReqObj = ( object ) array_filter( ( array ) $typeReqObj );
	
		// TODO: if primary key
		// service->update( $typeReqObj );

		// INSERT new entity
		$insertedObj = $this->service->insert( $typeReqObj );

		return ( !empty( $insertedObj ) )? $insertedObj : ( object )array( 'err' => 'HTTP/1.1 400 Bad Request', 'errCode' => 400 );
	
	}
	
	
}


?>
