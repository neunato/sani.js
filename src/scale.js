
const _settings = Symbol.for("settings")
const _virtual = Symbol.for("virtual")

// Scales and centers animation based on canvas size (`canvas.width` and `canvas.height`) and
// inner size (`settings.innerWidth`, `settings.innerHeight` and `settings.catchHeight`).

function scale(animator) {

   const { context } = animator
   const { canvas } = context
   const settings = animator[_settings]
   const dpr = window.devicePixelRatio || 1
   const { innerWidth, innerHeight, catchHeight, ballRadius } = settings

   // Match canvas size to css size, including pixel ratio.
   if (!animator[_virtual]) {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
   }

   // Convert metres to pixels.
   const multiplier = Math.max(0, Math.min(
      canvas.width / (innerWidth + (ballRadius * 2)),
      canvas.height / (innerHeight + (ballRadius * 2))
   ))
   settings.multiplier = multiplier

   // Center the animation by translating the canvas. This adjusts for the internal y-origin that
   // matches catch height and the required offset of one screen as y axis will be inverted.
   const surplus = {
      x: Math.max(0, canvas.width - ((innerWidth + (ballRadius * 2)) * multiplier)),
      y: Math.max(0, canvas.height - ((innerHeight + (ballRadius * 2)) * multiplier))
   }
   const offset = {
      x: (surplus.x * 0.5) + (ballRadius * multiplier),
      y: (surplus.y * 0.5) + (ballRadius * multiplier)
   }

   context.translate(offset.x, canvas.height - offset.y - (catchHeight * multiplier))

   // Invert y axis.
   context.scale(1, -1)

}

export { scale }
