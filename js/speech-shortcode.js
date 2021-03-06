speechSynthesis.getVoices(); // Pre-load voices.

document.addEventListener( "DOMContentLoaded", function( event ) {
	var speeches = document.querySelectorAll('.speech-shortcode');
	for ( var i = 0; i < speeches.length; i++ ) {
		speeches[ i ].addEventListener( 'click', read_text, false );
	}
} );

var read_text = function( event ) {
	speechSynthesis.cancel();
	document.querySelectorAll('.rumble').forEach( function( currentValue ) {
		currentValue.classList.remove( 'rumble' );
	} );

	var synthes = new SpeechSynthesisUtterance( this.textContent );

	// `boundary` or `start` doesn't fires with some voice.
	synthes.addEventListener( 'start', start_rumble( this ), false );
	synthes.addEventListener( 'boundary', start_rumble( this ), false );
	synthes.addEventListener( 'end', end_rumble( this ), false );

	synthes.lang = this.getAttribute( 'data-lang' );
	synthes.rate = parseFloat( this.getAttribute( 'data-rate' ) );

	var voice = this.getAttribute( 'data-voice' );
	var voices = speechSynthesis.getVoices();
	voices.forEach( function( v, i ) {
		if ( v.name == voice ) {
			synthes.voice = v;
		}
	} );

	speechSynthesis.speak( synthes );
}

var start_rumble = function( element ) {
	return function( event ) {
		element.classList.add( 'rumble' );
	}
}

var end_rumble = function( element ) {
	return function( event ) {
		element.classList.remove( 'rumble' );
	}
}
