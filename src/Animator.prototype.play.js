
import { Loop }    from "./Loop"
import { prepare } from "./prepare"
import { scale }   from "./scale"
import { update }  from "./update"

const _settings = Symbol.for("settings")
const _balls = Symbol.for("balls")
const _loop = Symbol.for("loop")


// Start playing new `siteswap` or unpause (if no siteswap supplied).

function play(siteswap) {

   this.paused = false

   if (siteswap === undefined)
      return

   // Already running.
   if (this[_loop])
      this.stop()

   const { Siteswap } = this.constructor

   if (typeof siteswap === "string")
      siteswap = new Siteswap(siteswap)

   this.siteswap = siteswap

   if (!(siteswap instanceof Siteswap))
      throw new Error("Invalid input.")

   if (!siteswap.valid)
      throw new Error("Invalid siteswap.")

   if (siteswap.degree > 2)
      throw new Error(`Pattern requires ${siteswap.degree} hands.`)

   if (siteswap.greatestValue === 0)
      return

   const settings = this[_settings]

   // Populate balls and new inner size (in metres).
   const [balls, { innerWidth, innerHeight, catchHeight }] = prepare(settings, siteswap)

   settings.innerWidth = innerWidth
   settings.innerHeight = innerHeight
   settings.catchHeight = catchHeight

   this[_balls] = balls

   // Scale and center animation.
   scale(this, false)

   // Start with balls on screen.
   if (this[_settings].continuous)
      this.seek(0, true)

   // Start the loop.
   this[_loop] = new Loop((delta) => update(this, delta))

}

export { play }
