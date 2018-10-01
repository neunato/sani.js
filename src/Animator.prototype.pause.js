
const _paused = Symbol.for("paused")

function pause() {

   this[_paused] = true

}

export { pause }
