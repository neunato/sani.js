
const _balls = Symbol.for("balls")


// `id` is an integer assigned to balls (in order of appearance?).

function dye(color, id) {

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

}

export { dye }
