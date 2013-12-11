var mysql = require( "mysql" );
var http = require( "http" );

var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "travis",
	password: "",
	database: "tc"
});

connection.connect(function( error ) {
	if ( error ) {
		console.error( error );
		process.exit( 1 );
	}

	connection.query(
		"SELECT * FROM `tc` WHERE `build` = ?",
		[ process.env.TRAVIS_BUILD_ID ],
	function( error, rows ) {
		if ( error ) {
			console.error( error );
			process.exit( 1 );
		}

		connection.end();

		var data = JSON.stringify( rows );
		var request = http.request({
			hostname: "ve.sfttky5s.vesrv.com",
			method: "POST",
			headers: {
				"Content-Length": data.length
			}
		});

		request.write( data );
		request.end();
	});
});
