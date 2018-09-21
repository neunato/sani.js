
import { clear } from "./clear"

const _balls = Symbol.for("balls")
const _loop = Symbol.for("loop")


function stop() {

   const loop = this[_loop]
   if (!loop)
      return

   clear(this.context)
   loop.kill()
   this[_loop] = null
   this[_balls].length = 0
   this.siteswap = null

}

export { stop }
