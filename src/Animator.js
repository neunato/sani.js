
import Siteswap                 from "siteswap.js"
import { configure }            from "./Animator.prototype.configure"
import { play }                 from "./Animator.prototype.play"
import { stop }                 from "./Animator.prototype.stop"
import { pause }                from "./Animator.prototype.pause"
import { dye }                  from "./Animator.prototype.dye"
import { seek }                 from "./Animator.prototype.seek"
import { toGIF }                from "./Animator.prototype.toGIF"
import { toGIF as toGIFStatic } from "./Animator.toGIF"

const _settings = Symbol.for("settings")
const _balls = Symbol.for("balls")
const _loop = Symbol.for("loop")
const _virtual = Symbol.for("virtual")


class Animator {

   constructor(canvas, options = {}) {

      this[_virtual] = false

      if (typeof canvas === "string")
         canvas = document.getElementById(canvas)

      if (!(canvas instanceof HTMLCanvasElement)) {

         // Passing an object with { width, height } implies a virtual animator, whose canvas is not in the DOM.
         if (typeof canvas === "object" && canvas.width && canvas.height) {
            const { width, height } = canvas
            canvas = document.createElement("canvas")
            canvas.width = width
            canvas.height = height
            this[_virtual] = true
         }
         else {
            throw new Error("Canvas element not supplied.")
         }
      }

      this.context = canvas.getContext("2d")
      this.siteswap = null
      this.paused = false

      this[_loop] = null
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

Animator.Siteswap = Siteswap
Animator.prototype.play = play
Animator.prototype.stop = stop
Animator.prototype.pause = pause
Animator.prototype.configure = configure
Animator.prototype.dye = dye
Animator.prototype.seek = seek
Animator.prototype.toGIF = toGIF
Animator.toGIF = toGIFStatic


export { Animator }
