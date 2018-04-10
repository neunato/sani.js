import Siteswap from "siteswap.js";
import { Loop } from "./Loop";
import { prepare } from "./prepare";
import { update }  from "./update";
 

const _settings = Symbol.for("settings")
const _paused = Symbol.for("paused")
const _balls = Symbol.for("balls")
const _loop = Symbol.for("loop")



function start( siteswap, notation ){

	// Already running.
	if( this[_loop] ){
		this.stop();
	}

   if( typeof siteswap === "string" )
      siteswap = new Siteswap(siteswap, notation);

	this.siteswap = siteswap;

	if( !siteswap.valid ){
		throw new Error("Invalid siteswap.");
	}

	if( siteswap.degree > 2 ){
		throw new Error(`Pattern requires ${siteswap.degree} hands.`);
	}

	if( siteswap.greatestValue === 0 ){
		return;
	}

   const settings = this[_settings];

	// Populate balls and scale the animation.
	prepare(this);

	this[_paused] = false;
   this[_loop] = new Loop( delta => update(this, delta) );

}

export { start };
