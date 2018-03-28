

function update( delta ){

	// Canvas size changed, rescale animation.
	const canvas = this.context.canvas;
	if( canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight ){
		this.scale();

		if( this.paused )   // If paused stuff won't redraw, that's why.
			this.draw();
	}
	
	if( this.paused ){
		return;
	}



 
   // Update ball positions.
   for( const ball of this.balls ){
      ball.clear(this.context, this.settings);
   }

   for( const ball of this.balls ){
      ball.update(delta / this.settings.slowdown);   
      ball.draw(this.context, this.settings);
   }

}

export { update };