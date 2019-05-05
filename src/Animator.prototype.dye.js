
import { cache } from "./cache"

const _balls = Symbol.for("balls")
const _settings = Symbol.for("settings")


// `id` is an integer assigned to balls (in order of appearance?).

function dye(color, id) {

   const settings = this[_settings]
   const balls = this[_balls]

   if (id === undefined) {
      for (const ball of balls)
         ball.color = color
   }
   else {
      if (!balls[id])
         throw new Error("Ball doesn't exist.")
      balls[id].color = color
   }

   // Redraw and cache balls.
   cache(balls, settings)

}

export { dye }
