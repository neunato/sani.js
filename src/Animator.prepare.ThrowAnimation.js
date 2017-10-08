
class ThrowAnimation {
	
	constructor( frameCount, fps, position, velocity, acceleration ){

		this.frameCount = frameCount;
		this.fps = fps;

		// Initial position and velocity.
		this.position = position;
		this.velocity = velocity;
		this.acceleration = acceleration;

	}

	nextPosition( frameAt ){

		const time = frameAt / this.fps;
		const position = {
			x: this.position.x + this.velocity.x * time,
			y: this.position.y + this.velocity.y * time + this.acceleration.y * time * time * 0.5
		};
		return position;

	}

}

export { ThrowAnimation };