
class Ball {
      
   constructor( color ){

      this.position = { x: NaN, y: NaN };
      this.color = color;
      this.animationAt = 0;
      this.animations = [];
      this.elapsed = 0;

   }

   update( delta ){
      
      this.elapsed += delta;

      const animation = this.animations[this.animationAt];
      if( this.elapsed >= animation.duration ){
         this.animationAt = (this.animationAt + 1) % this.animations.length;
         this.elapsed = this.elapsed - animation.duration;
         return this.update(0);
      }

      this.position = animation.getPosition(this.elapsed);

   }

   clear( context, settings ){

      const { ballRadius, multiplier } = settings;

      // Clear an additional 2px pixels of width to fix occasional subpixel trails.
      const width = (ballRadius * multiplier + 2) * 2;
      const x = this.position.x * multiplier - width / 2;
      const y = this.position.y * multiplier - width / 2;
      context.clearRect(x, y, width, width);

   }

   draw( context, settings ){

      const radius = settings.ballRadius * settings.multiplier;
      const x = this.position.x * settings.multiplier;
      const y = this.position.y * settings.multiplier;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.globalAlpha = this.position.y > 0 ? 0.9 : 0.55;
      context.fill();
      context.closePath();

   }

}

export { Ball };

