
const _balls = Symbol.for("balls")
const _settings = Symbol.for("settings")


// Update the animation to `percent` % of full cycle duration, relative to the beginning of second
// cycle if `continuous` is true (all balls in screen), or first (balls thrown as their turn comes)
// otherwise.

function seek(percent, continuous = false) {

   if (typeof percent !== "number" || percent < 0 || percent > 100)
      throw new Error("Expected number in [0-100] range.")

   if (percent === 100)
      percent = 0

   if (continuous)
      percent += 100

   const settings = this[_settings]
   const balls = this[_balls]
   const duration = this.siteswap.fullPeriod * (this.siteswap.fullPeriod % 2 ? 2 : 1) * settings.beatDuration

   // Update ball timings.
   for (const ball of balls)
      ball.update(percent / 100 * duration, true)

}

export { seek }
