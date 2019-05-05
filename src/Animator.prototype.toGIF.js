
import { Animator } from "./Animator"

const _settings = Symbol.for("settings")


function toGIF(settings) {

   const { canvas } = this.context
   const defaults = {
      width: canvas.width,
      height: canvas.height
   }

   return Animator.toGIF(this.siteswap, Object.assign(defaults, this[_settings], settings))

}

export { toGIF }
