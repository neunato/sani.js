
import { motion } from "./motion"


class ThrowAnimation {

   constructor(duration, position, velocity, acceleration) {

      this.duration = duration

      // Initial position and velocity.
      this.position = position
      this.velocity = velocity
      this.acceleration = acceleration

   }

   // Elapsed time from beginning of animation.
   getPosition(time) {

      const position = {
         x: this.position.x + motion.s(this.velocity.x, this.acceleration.x, time),
         y: this.position.y + motion.s(this.velocity.y, this.acceleration.y, time)
      }
      return position

   }

}

export { ThrowAnimation }
