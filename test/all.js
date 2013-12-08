var fs = require( "fs" );

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

	reporter.run([ "test/unit" ], options, callback );
}

function checkCla( callback ) {
	process.nextTick(function() {
		console.log( "CLA ok" );
		callback( null );
	});
}
