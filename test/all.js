var exec = require( "child_process" ).exec;
var github = require( "github-request" );

process.env.TRAVIS_PULL_REQUEST = "3";
process.env.TRAVIS_REPO_SLUG = "scottgonzalez/temp-test";

function getPrCommits( callback ) {
	var path = "/repos/" + process.env.TRAVIS_REPO_SLUG +
		"/pulls/" + process.env.TRAVIS_PULL_REQUEST +
		"/commits";

	github.requestAll({
		path: path
	}, function( error, commits ) {
		if ( error ) {
			return callback( error );
		}

		// Reduce to just SHAs
		commits = commits.map(function( commit ) {
			return commit.sha;
		});

		callback( null, commits );
	});
}

function getPrCommitRange( callback ) {
	getPrCommits(function( error, commits ) {
		if ( error ) {
			return callback( error );
		}

		var first = commits.shift();
		var last = commits.pop();
		var range = first + ".." + last;

		callback( null, range );
	});
}

function getLocalCommits( range, callback ) {
	exec( "git log --oneline " + range, function( error, stdout ) {
		if ( error ) {
			return callback( error );
		}

		var commits = stdout.trim().split( "\n" );
		callback( null, commits );
	});
}



if ( !process.env.TRAVIS_PULL_REQUEST ) {
	return;
}

getPrCommitRange(function( error, range ) {
	if ( error ) {
		console.error( error );
		process.exit( 1 );
	}

	getLocalCommits( range, function( error, commits ) {
		if ( error ) {
			console.error( error );
			process.exit( 1 );
		}

		console.log( commits.length + " commits:" );
		console.log( commits );
	});
});
