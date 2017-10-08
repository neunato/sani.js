
function update(){

	// Negative `frameAt` means delay.
	if( this.frameAt < 0 ){
		this.frameAt++;
		return;
	}
	
	const animation = this.animations[this.animationAt];
	
	if( this.frameAt === animation.frameCount ){
		this.frameAt = 0;
		this.animationAt = (this.animationAt + 1) % this.animations.length;
		return this.update();
	}

	this.position = animation.nextPosition(this.frameAt);
	this.frameAt++;

}

export { update };