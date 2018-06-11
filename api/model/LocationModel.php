<?php

/**
* Entity Model
* @param Location propertys
* @access public
*/
class LocationModel {


	public $location_id;
	public $location_name;
	public $location_lat;
	public $location_lng;
	public $location_timestamp;
	public $location_active;

	
	public function __construct( $location_id = null, $location_name = null, $location_lat = null, $location_lng = null, $location_timestamp = null, $location_active = null ) {
	// public function LocationModel( $location_id = null, $location_name = null, $location_lat = null, $location_lng = null, $location_timestamp = null, $location_active = null ) {
	
		$this->location_id = $location_id;
		$this->location_name = $location_name;
		$this->location_lat = $location_lat;
		$this->location_lng = $location_lng;
		$this->location_timestamp = $location_timestamp;
		$this->location_active = $location_active; 

	}

	
	public function setLocationId( $location_id ) {
	
		$this->location_id = $location_id;
	
	}

	
	public function setLocationName( $location_name ) {
	
		$this->location_name = $location_name;
	
	}


	public function setLocationLat( $location_lat ) {
	
		$this->location_lat = $location_lat;
	
	}


	public function setLocationLng( $location_lng ) {
	
		$this->location_lng = $location_lng;
	
	}


	public function setLocationTimestamp( $location_timestamp ) {
	
		$this->location_timestamp = $location_timestamp;
	
	}


	public function setLocationActive( $location_active ) {
	
		$this->location_active = $location_active;
	
	}
	

}

?>
