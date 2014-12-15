var exec = require( "child_process" ).exec;

all([
	logEnv,
	logCommits,
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

function logEnv( callback ) {
	console.log( process.env );
	callback( null );
}

function logCommits( callback ) {
	exec( "git log --oneline", function( error, stdout ) {
		if ( error ) {
			return callback( error );
		}

		var commits = stdout.trim().split( "\n" );
		console.log( commits.length + " commits:" );
		console.log( commits );
		callback( null );
	});
}
