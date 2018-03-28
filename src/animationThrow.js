
class ThrowAnimation {
	
	constructor( duration, position, velocity, acceleration ){

      this.duration = duration;

		// Initial position and velocity.
		this.position = position;
		this.velocity = velocity;
		this.acceleration = acceleration;

	}

   // Elapsed time from beginning of animation.
	getPosition( time ){

		const position = {
			x: this.position.x + this.velocity.x * time,
			y: this.position.y + this.velocity.y * time + this.acceleration.y * time * time * 0.5
		};
		return position;

	}

}

export { ThrowAnimation };