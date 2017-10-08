
// `id` is an integer assigned to balls (in order of appearance?).

function dye( color, id ){

	if( id === undefined ){
		for( const ball of this.balls )
			ball.color = color;
	}
	else{
		if( !this.balls[id] )
			throw new Error("Ball doesn't exist.");
		this.balls[id].color = color;
	}
	

	if( this.paused ){
		this.clear();
		this.draw();
	}

}

export { dye };