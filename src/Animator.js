
import { configure } from "./Animator.prototype.configure"
import { play }      from "./Animator.prototype.play"
import { stop }      from "./Animator.prototype.stop"
import { pause }     from "./Animator.prototype.pause"
import { dye }       from "./Animator.prototype.dye"
import { seek }      from "./Animator.prototype.seek"


const _settings = Symbol.for("settings")
const _paused = Symbol.for("paused")
const _balls = Symbol.for("balls")
const _loop = Symbol.for("loop")



class Animator {

   constructor(canvas, options = {}) {

      const element = typeof canvas === "string" ? document.getElementById(canvas) : canvas
      if (!element)
         throw new Error("Canvas element not supplied.")

      this.context = element.getContext("2d")
      this.siteswap = null

      this[_loop] = null
      this[_paused] = false
      this[_balls] = []

      // Default settings.
      this[_settings] = {
         // Configurable by `this.configure`.
         dwell: 0.5,
         slowdown: 1,
         reversed: false,
         continuous: true,
         ballColor: "#ff3636",
         beatDuration: 300,       // In miliseconds.

         // Not configurable.
         ballRadius: 70,          // In milimetres.
         catchWidth: 400,         // In milimetres.
         innerHeight: 0,          // In milimetres. Set by `.scale()`.
         innerWidth: 0,           // In milimetres. Set by `.scale()`.
         catchHeight: 0,          // In milimetres. Set by `.scale()`.

         multiplier: null         // Pixels per milimetre.
      }
      this.configure(options)

   }

}

Animator.prototype.play = play
Animator.prototype.stop = stop
Animator.prototype.pause = pause
Animator.prototype.configure = configure
Animator.prototype.dye = dye
Animator.prototype.seek = seek


export { Animator }
