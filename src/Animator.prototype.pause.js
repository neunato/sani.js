
const _paused = Symbol.for("paused")

function pause(){

	this[_paused] = !this[_paused];

}

export { pause };
