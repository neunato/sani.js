
import { cache } from "./cache"

const _settings = Symbol.for("settings")
const _balls = Symbol.for("balls")
const _virtual = Symbol.for("virtual")


// Scales and centers animation based on canvas size (`canvas.width` and `canvas.height`) and
// inner size (`settings.innerWidth`, `settings.innerHeight` and `settings.catchHeight`).

function scale(animator, reactive = true) {

   const virtual = animator[_virtual]
   const { canvas } = animator.context

   // Resize canvas to match css size, unless `virtual`. If `reactive` is true, abort the function
   // if canvas size hasn't changed (it's false when first playing a siteswap, when scaling is wanted
   // regardless of canvas being changed).
   if (!virtual) {
      const dpr = window.devicePixelRatio || 1
      const width = Math.floor(canvas.clientWidth * dpr)
      const height = Math.floor(canvas.clientHeight * dpr)

      if (reactive && canvas.width === width && canvas.height === height)
         return

      canvas.width = width
      canvas.height = height
   }

   const settings = animator[_settings]
   const balls = animator[_balls]
   const { context } = animator
   const { width, height } = canvas
   const { innerWidth, innerHeight, catchHeight, ballRadius } = settings

   // Scale animation by converting metres to pixels.
   const multiplier = Math.max(0, Math.min(
      width / (innerWidth + (ballRadius * 2)),
      height / (innerHeight + (ballRadius * 2))
   ))
   settings.multiplier = multiplier


   // Center the animation by translating the canvas. This adjusts for the internal y-origin that
   // matches catch height and the required offset of one screen as y axis will be inverted.
   const surplus = {
      x: Math.max(0, width - ((innerWidth + (ballRadius * 2)) * multiplier)),
      y: Math.max(0, height - ((innerHeight + (ballRadius * 2)) * multiplier))
   }
   const offset = {
      x: (surplus.x * 0.5) + (ballRadius * multiplier),
      y: (surplus.y * 0.5) + (ballRadius * multiplier)
   }

   context.translate(offset.x, height - offset.y - (catchHeight * multiplier))
   context.scale(1, -1)                           // Invert y axis.


   // Redraw and cache balls.
   cache(balls, settings)

}


export { scale }
