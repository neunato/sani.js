
import { scale } from "./scale"
import { clear } from "./clear"

const _settings = Symbol.for("settings")
const _balls = Symbol.for("balls")
const _virtual = Symbol.for("virtual")


function update(animator, delta) {

   const { context } = animator
   const { canvas } = context
   const settings = animator[_settings]
   const balls = animator[_balls]

   // Canvas size changed, rescale animation.
   if (!animator[_virtual] && (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight))
      scale(animator)

   // Update ball positions.
   clear(context)

   for (const ball of balls) {
      if (!animator.paused)
         ball.update(delta / settings.slowdown)
      ball.draw(context, settings)
   }

}

export { update }
