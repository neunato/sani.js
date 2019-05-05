
let canvases = null


function cache(balls, settings) {

   canvases = {}

   // An additional 20% to guarantee the ball does not overflow.
   const size = settings.ballRadius * settings.multiplier * 2.2

   for (const ball of balls) {
      const { color } = ball

      ball.canvas = canvases[color]
      if (ball.canvas)
         continue

      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      canvas.width = size
      canvas.height = size

      ball.draw(context, settings, { x: size / 2, y: size / 2 })

      ball.canvas = canvas
      canvases[color] = canvas
   }

}

export { cache }
