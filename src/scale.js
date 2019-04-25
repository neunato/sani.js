
const _settings = Symbol.for("settings")

// Scales and centers animation based on canvas size (`canvas.width` and `canvas.height`) and
// inner size (`settings.innerWidth`, `settings.innerHeight` and `settings.catchHeight`).

function scale(animator) {

   const { context } = animator
   const { canvas } = context
   const settings = animator[_settings]
   const dpr = window.devicePixelRatio || 1

   // Match canvas size to css size, including pixel ratio.
   canvas.width = canvas.clientWidth * dpr
   canvas.height = canvas.clientHeight * dpr

   // Convert metres to pixels.
   settings.multiplier = Math.max(0, Math.min(
      canvas.width / (settings.innerWidth + (settings.ballRadius * 2)),
      canvas.height / (settings.innerHeight + (settings.ballRadius * 2))
   ))

   // Center the animation by translating the canvas. This adjusts for the internal y-origin that
   // matches catch height and the required offset of one screen as y axis will be inverted.
   const surplus = {
      x: Math.max(0, canvas.width - ((settings.innerWidth + (settings.ballRadius * 2)) * settings.multiplier)),
      y: Math.max(0, canvas.height - ((settings.innerHeight + (settings.ballRadius * 2)) * settings.multiplier))
   }
   const offset = {
      x: (surplus.x * 0.5) + (settings.ballRadius * settings.multiplier),
      y: (surplus.y * 0.5) + (settings.ballRadius * settings.multiplier)
   }

   context.translate(offset.x, canvas.height - offset.y - (settings.catchHeight * settings.multiplier))

   // Invert y axis.
   context.scale(1, -1)

}

export { scale }
