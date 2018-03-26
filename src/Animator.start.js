
import Siteswap from "siteswap.js";


function start( siteswap, notation ){

	// Already running.
	if( this.request ){
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

	if( !validMultiplexTwins(siteswap, this.settings.multiplexTwinLimit)){
		throw new Error("Multiplex twin limit exceeded.");
	}

	// Populate balls and scale the animation.
	this.prepare();

	if( this.settings.ballRadius * this.settings.multiplier * 2  <  this.settings.ballRadiusLimit ){
		throw new Error("Balls too small for this screen.");
	}

	this.paused = false;

   this.update = this.constructor.prototype.update.bind(this);

   this.timestamp = performance.now()

	this.request = window.requestAnimationFrame( this.update );

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
