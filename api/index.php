<?php


// HTTP/1.1 400 Bad Request - The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
// HTTP/1.1 404 Not Found - The server has not found anything matching the Request-URI.
// HTTP/1.1 403 Forbidden - The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
// HTTP/1.1 401 Unauthorized - The request requires user authentication. The response MUST include a WWW-Authenticate header field (section 14.47) containing a challenge applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field.
// HTTP/1.1 200 OK - The request has succeeded. The information returned with the response is dependent on the method used in the request, for example:


/** 
 * Router
 */
$requestMethod = $_SERVER['REQUEST_METHOD'];

switch ( $requestMethod ) {
	
	case 'GET':
		doGet();
		break;
		
	// case 'POST':
	// 	doPost();
	// 	break;

	default:
		doHttpErr();
}


/**
 * Sort URL Req, interpret into data controller.
 * @return {obj} TypeController
 * @access public
 */
function validateAndGetController() {
	
	// data type
	$type = ( !empty( $_REQUEST['type'] ) )? $_REQUEST['type'] : null;
	
	// can get controller
	if ( !$type ) doHttpErr( ( object )array() );
	
	if ( file_exists( 'controller/' . $type . '.php' ) ) {
	
		require_once( 'controller/' . $type . '.php' );
	
	} else {
	
		doHttpErr( ( object )array( 'err' => 'HTTP/1.1 404 Not Found', 'errCode' => 404 ) );
	
	}
	
	// can instantiate controller
	$ControllerClass = ucfirst( $type );
	
	$controller = new $ControllerClass();
	
	if ( $controller->isPublic === false ) doHttpErr( ( object )array( 'err' => 'HTTP/1.1 403 Forbidden', 'errCode' => 403 ) );
	
	return $controller;
	
}


/**
 * GET
 * @return {json} data
 * @access public
 */
function doGet() {
	
	// validate request
	$controller = validateAndGetController();

	// remove meta
	unset( $_GET['type'] );

	// execute request
	$response = $controller->doGet( ( !empty( $_GET ) )? $_GET : null );
	
	if ( is_object( $response ) === true && property_exists( $response, 'err' ) ) doHttpErr( ( object )array( 'err' => $response->err, 'errCode' => $response->errCode ) );
		
	// res
	doHttpSuccess( ( object )array( 'data' => $response ) );

}


// /**
//  * POST
//  * @return {json} data
//  * @access public
//  */
// function doPost() {
	
// 	// validate request
// 	$controller = validateAndGetController();

	// // remove meta
	// unset( $_GET['type'] );

// 	// execute request
// 	$response = $controller->doPost( ( !empty( $_POST ) )? $_POST : null );

// 	if ( is_object( $response ) === true && property_exists( $response, 'err' ) ) doHttpErr( ( object )array( 'err' => $response->err, 'errCode' => $response->errCode ) );

// 	// res
// 	doHttpSuccess( ( object )array( 'data' => $response ) );

// }


/**
 * Return HTTP success
 * @param {obj} $args
 * @example doHttpErr( ( object )array( 'head' => 'john', 'headCode' => 13 ) );
 * @access public
 */
function doHttpSuccess( $args = null ) {

	$data = $args->data;
	$head = ( $args !== null && property_exists( $args, 'head' ) )? $args->head : 'HTTP/1.1 200 OK';
	$headCode = ( $args !== null && property_exists( $args, 'headCode' ) )? $args->headCode : 200;

	header( $head, true, $headCode );
	die( json_encode( $data ) );

};


/**
 * Return HTTP error
 * @param {obj} $args
 * @example doHttpErr( ( object )array( 'err' => 'john', 'errCode' => 13 ) );
 * @access public
 */
function doHttpErr( $args = null ) {
	
	$err = ( $args !== null && property_exists( $args, 'err' ) )? $args->err : 'HTTP/1.1 400 Bad Request';
	$errCode = ( $args !== null && property_exists( $args, 'errCode' ) )? $args->errCode : 400;
	
	header( $err, true, $errCode );
	die( $err );
	
};


?>