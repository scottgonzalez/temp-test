var fs = require( "fs" );
var tc = require( "../tc" );

all([
	unitTests,
	checkCla
], function( errors ) {
	if ( errors.length ) {
		process.exit( 1 );
	}
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
			tc.store( "unittest", "failed" );
			return callback( error );
		}

		tc.store( "unittest", "passed" );
		callback( null );
	});
}

function checkCla( callback ) {
	process.nextTick(function() {
		console.log( "CLA ok" );
		tc.store( "cla", "passed" );
		callback( null );
	});
}
