var fs = require( "fs" );

exports.store = store;
exports.read = read;

var data = {};

function store( key, value ) {
	data[ key ] = value;
}

function write() {
	fs.writeFileSync( "__tc.json", JSON.stringify( data ) );
}

function read() {
	return JSON.parse( fs.readFileSync( "__tc.json" ) );
}

process.on( "exit", write );
