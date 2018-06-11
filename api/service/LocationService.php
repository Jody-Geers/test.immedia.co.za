<?php


require_once( 'AbstractService.php' );
require_once( 'model/LocationModel.php' );


/**
* Entity Service Layer
* @access public
*/
class LocationService extends AbstractService {

	
	public $model;
	
	
	public function __construct() {
	// public function LocationService() {
		
		parent::__construct();
		
		$this->model = new LocationModel();
		
	}

	
}


?>