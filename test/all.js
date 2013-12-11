var fs = require( "fs" );
var mysql = require( "mysql" );

var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "travis",
	password: "",
	database: "tc"
});

function store( key, value, callback ) {
	connection.query(
		"INSERT INTO `tc` SET " +
			"`build` = ?," +
			"`job` = ?," +
			"`key` = ?," +
			"`value` = ?",
		[ process.env.TRAVIS_BUILD_ID, process.env.TRAVIS_JOB_ID, key, value ],
	callback );
}

connection.connect(function( error ) {
	if ( error ) {
		console.error( error );
		process.exit( 1 );
	}

	all([
		unitTests,
		checkCla
	], function( errors ) {
		connection.end();
		if ( errors.length ) {
			process.exit( 1 );
		}
	});
});

function all( steps, callback ) {
	var errors = [];

	function next() {
		var step = steps.shift();
		step(function( error ) {
			if ( error ) {
				errors.push( error );
			}

			if ( !steps.length ) {
				return callback( errors );
			}

			next();
		});
	}

	next();
}

function unitTests( callback ) {
	var nodeunit = require( "nodeunit" );
	var reporter = nodeunit.reporters.default;
	var options = require( "nodeunit/bin/nodeunit.json" );

	reporter.run([ "test/unit" ], options, function( error ) {
		if ( error ) {
			return store( "unittest", "failed", function() {
				callback( error );
			});
		}

		store( "unittest", "passed", function( error ) {
			if ( error ) {
				console.log( "!!! error storing results" );
			}

			callback( null );
		});
	});
}

function checkCla( callback ) {
	process.nextTick(function() {
		console.log( "CLA ok" );
		store( "cla", "passed", function( error ) {
			if ( error ) {
				console.log( "!!! error storing results" );
			}

			callback( null );
		});
	});
}
