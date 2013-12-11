var mysql = require( "mysql" );

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
		"CREATE TABLE `tc` (" +
			"`build` INT," +
			"`job` INT," +
			"`key` VARCHAR(63)," +
			"`value` TEXT" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	function( error ) {
		if ( error ) {
			console.error( error );
			process.exit( 1 );
		}

		console.log( "Table created!" );
		connection.end();
	});
});
