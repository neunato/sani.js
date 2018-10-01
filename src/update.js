
import { scale } from "./scale"
import { clear } from "./clear"


const _settings = Symbol.for("settings")
const _paused = Symbol.for("paused")
const _balls = Symbol.for("balls")


function update(animator, delta) {

   const { context } = animator
   const { canvas } = context
   const settings = animator[_settings]
   const balls = animator[_balls]
   const paused = animator[_paused]

   // Canvas size changed, rescale animation.
   if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {

      // Set new canvas size.
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      scale(animator)

      // If paused stuff won't redraw, that's why.
      if (paused) {
         for (const ball of balls)
            ball.draw(context, settings)
      }

   }

   if (paused)
      return


   // Update ball positions.
   clear(context)

   for (const ball of balls) {
      ball.update(delta / settings.slowdown)
      ball.draw(context, settings)
   }

}

export { update }
