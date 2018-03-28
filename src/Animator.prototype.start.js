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

	if( !validMultiplexTwins(siteswap, settings.multiplexTwinLimit)){
		throw new Error("Multiplex twin limit exceeded.");
	}

	// Populate balls and scale the animation.
	prepare(this);

	this[_paused] = false;
   this[_loop] = new Loop( delta => update(this, delta) );

}

export { start };



// Check if all multiplex twins fit in a beat with current `dwellStep`. 

function validMultiplexTwins( siteswap, multiplexTwinLimit ){

	if( siteswap.multiplex <= multiplexTwinLimit )
		return true;

   // This is identical to `multiplexes` in `Animator.prepare.js` and should be extracted to one place.
   const multiplexes = siteswap.throws.map(action => action.map(function(release){
      return release.reduce(function(result, toss){
         const key = `${toss.value}-${toss.handTo}`;
         result[key] = (result[key] || 0) + 1;
         return result;
      }, {});
   }));

   const max = Math.max( ...multiplexes.map( action => Math.max( ...action.map(group => Math.max(...Object.keys(group).map(key => group[key]))) ) ) );
	return max <= multiplexTwinLimit;

}
