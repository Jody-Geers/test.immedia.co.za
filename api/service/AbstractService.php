<?php


require_once( 'config/Config.php' );


/**
* Entity Service Shared Data Access
*/
Abstract class AbstractService {

	
	private $_dbConnection;
	private $_config;
	
	
	public function __construct() {
	// public function AbstractService() {
	
		$this->_config = new Config();
	
		$this->_dbConnection = mysqli_connect( $this->_config::LINK, $this->_config::UN, $this->_config::PW, $this->_config::DB );
	
	}
	
	
	/**
	 * helper - creates array of model objects
	 * @param {dbresult} $resultSet
	 * @return {array} $returnArr
	 * @access private
	 */
	private function _createModelArrFromResultSet( $resultSet ) {
	
		$returnArr = array();
	
		while( $row = mysqli_fetch_array( $resultSet ) ) {

			array_push( $returnArr, $this->createModelObj( $row ) );
				
		}
	
		return $returnArr;
		
	}


	/**
	 * helper - create model objects
	 * @param {obj} $obj
	 * @return {obj} $entity
	 * @access public
	 */
	public function createModelObj( $obj ) {

		// has to be set at child class
		$entity = new $this->model();
		
		foreach( $obj as $key => $value ) {

			// inore int keys
			// ignore null vals
			if ( ( !preg_match( '/^\d+$/', $key ) ) && ( $value !== null ) ) {

				// create the property setters functions
				$objProp = '';

				$objPropArr = explode( '_', $key );

				foreach( $objPropArr as $objPropArrVal ) {

					if ( $objPropArrVal !== str_replace( '_', '', $this->_config::PREFIX ) ) {

						$objProp .= ucfirst( $objPropArrVal );

					}

				}
			
				// is setPropertyName() valid?
				if ( !empty( $objProp ) ) {
			
					$function = 'set' . $objProp;
			
					if ( method_exists( $entity, $function ) ) $entity->$function( $value );
			
				}

			}
		
		}
		
		return $entity;
		
	}


	/**
	 * get data from provider
	 * @return {array} Type || {object} Type
	 * @access public
	 */
	public function get() {
		
		$returnArr = array();
		
		// model definition
		$modelName = ( property_exists( $this, 'modelName' ) )? $this->modelName : str_replace( 'Service', '', get_class( $this ) );
	
		// build sql
		$sql = 'SELECT * FROM ' . $this->_config::PREFIX . strtolower( $modelName );
		
		// execute and return model objects
		$returnArr = $this->_createModelArrFromResultSet( mysqli_query( $this->_dbConnection, $sql ) );
	
		return $returnArr;
	
	}
	
	
	/**
	 * get data from provider using params
	 * @param {obj} $args - Type based propertys
	 * @return {array} Type || {object} Type
	 * @access public
	 */
	public function getByParams( $args ) {
	
		$returnArr = array();
		
		// model definition
		$modelName = ( property_exists( $this, 'modelName' ) )? $this->modelName : str_replace( 'Service', '', get_class( $this ) );
		
		// where this = that
		$whereSqlBuilder = '';

		foreach ( $args as $key => $val ) {
				
			$whereSqlBuilder .= $key . ' = ' . $this->wrapValInParenthesis( $val ) . ' AND ';
				
		}
		$whereSqlBuilder = rtrim( $whereSqlBuilder, ' AND ' );
	
		// build sql
		$sql = 'SELECT * FROM ' . $this->_config::PREFIX . strtolower( $modelName ) . ' WHERE ' . $whereSqlBuilder;

		// execute and return model objects
		$returnArr = $this->_createModelArrFromResultSet( mysqli_query( $this->_dbConnection, $sql ) );
	
		return $returnArr;
	
	}


	/**
	 * insert data into provider
	 * @param {obj} $args - Type based propertys
	 * @return {array} Type || {object} Type
	 * @access public
	 */
	public function insert( $args ) {
		
		$returnObj = new stdClass();

		// model definition
		$modelName = ( property_exists( $this, 'modelName' ) )? $this->modelName : str_replace( 'Service', '', get_class( $this ) );

		// build sql
		$sql = 'INSERT INTO ' . $this->_config::PREFIX . strtolower( $modelName ) . ' ';

		// ( col ) ( 'val' )
		$colSqlBuilder = '';
		$valSqlBuilder = '';

		foreach ( $args as $key => $val ) {
			
			$colSqlBuilder .= $this->_config::PREFIX . $key . ', ';

			$valSqlBuilder .= $this->wrapValInParenthesis( $val ) . ', ';
				
		}
		$colSqlBuilder = rtrim( $colSqlBuilder, ', ' );
		$valSqlBuilder = rtrim( $valSqlBuilder, ', ' );

		// build sql
		$sql .= '( ' . $colSqlBuilder . ' ) VALUES ( ' . $valSqlBuilder . ' );';
		
		// execute and return affected model objects
		if ( mysqli_query( $this->_dbConnection, $sql ) === true ) {

			$returnObj = $this->getByParams( ( object )array( $this->_config::PREFIX . strtolower( $modelName ) . '_id' => $this->_dbConnection->insert_id ) );

			return $returnObj[0];

		} else {

			return null;

		}
	
	}


	/**
	 * Takes a string and decided whether it should be
	 * wrapped in '$val' based on its type / content.
	 * @param {string} $val
	 * @return {string} $val
	 * @access public
	 */
	public function wrapValInParenthesis( $val ) {
	
		// ints
		if ( is_numeric( $val ) ) {
				
			return "" . $val . "";
				
		}
	
		// special strings
		if ( ( $val == 'NOW()' ) || ( $val == 'true' ) || ( $val == 'false' ) ) {
	
			return "" . $val . "";
	
		}
			
		// use Parenthesis
		return "'" . $val . "'";
	
	}
	
	
}


?>
