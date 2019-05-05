
import { Animator } from "./Animator"
import { update }   from "./update"
import GIF          from "gif.js/dist/gif"
import worker       from "./workers/gif"        // "gif.js/dist/gif.worker.js" exported as a string during build.

const _settings = Symbol.for("settings")
const _loop = Symbol.for("loop")

let workerScript = null


function toGIF(siteswap, settings) {

   if (!siteswap || !siteswap.valid)
      throw new Error("Invalid siteswap.")

   const { width = 300, height = 600, fps = 60, backgroundColor = "#fff" } = settings

   const animator = new Animator({ width, height }, settings)
   const { canvas } = animator.context
   animator.play(siteswap)
   animator[_loop] = null                      // Disable update loop.
   animator.seek(0, true)

   if (!workerScript)
      workerScript = URL.createObjectURL(new Blob([worker], { type: "application/javascript" }))

   const gif = new GIF({
      workers: 4,
      quality: 10,
      workerScript,
      background: backgroundColor
   })

   const { fullPeriod } = siteswap
   const { beatDuration, slowdown } = animator[_settings]
   const delta = 1000 / fps
   const count = Math.round(((fullPeriod % 2 ? fullPeriod * 2 : fullPeriod) * beatDuration * slowdown) / delta)

   for (let i = 0; i < count; i++) {
      gif.addFrame(canvas, { copy: true, delay: delta })
      update(animator, delta)
   }

   const promise = new Promise((resolve, reject) => {
      try {
         gif.on("finished", resolve)
         gif.render()
      }
      catch (e) {
         reject(e)
      }
   })

   // Add a third callback for progress event.
   promise.then = function(onResolve, onReject, onProgress) {
      if (onProgress)
         gif.on("progress", onProgress)
      return Promise.prototype.then.call(this, onResolve, onReject)
   }

   return promise

}

export { toGIF }
