
class Ball {

   constructor(color) {

      this.position = { x: NaN, y: NaN }
      this.color = color
      this.animationAt = -1
      this.animations = []
      this.elapsed = 0

   }

   update(delta, reset = false) {

      const { animations } = this

      if (reset) {
         this.animationAt = -1
         this.elapsed = 0
      }

      this.elapsed += delta

      let animation = animations[this.animationAt]

      while (this.elapsed >= animation.duration) {
         this.animationAt = (this.animationAt + 1) % animations.length
         this.elapsed -= animation.duration
         animation = animations[this.animationAt]
      }

      this.position = animation.getPosition(this.elapsed)

   }

   draw(context, settings) {

      const radius = settings.ballRadius * settings.multiplier
      const x = this.position.x * settings.multiplier
      const y = this.position.y * settings.multiplier
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fillStyle = this.color
      context.globalAlpha = this.position.y > 0 ? 0.9 : 0.55
      context.fill()
      context.closePath()

   }

}

export { Ball }

