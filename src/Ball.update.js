
// Elapsed time from beginning of animation.

function update( delta ){
	
   this.elapsed += delta;

   const animation = this.animations[this.animationAt];
	if( this.elapsed >= animation.duration ){
      this.animationAt = (this.animationAt + 1) % this.animations.length;
      this.elapsed = this.elapsed - animation.duration
		return this.update(0);
	}

	this.position = animation.getPosition(this.elapsed);

}

export { update };