exports.foo = {
	good: function( test ) {
		test.expect( 2 );
		test.ok( true );
		test.equal( 2 + 3, 5 );
		test.done();
	// },

	// bad: function( test ) {
	// 	test.expect( 1 );
	// 	test.ok( false );
	// 	test.done();
	}
};
