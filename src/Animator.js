
import { pause }     from "./Animator.pause";
import { stop }      from "./Animator.stop";
import { scale }     from "./Animator.scale";
import { update }    from "./Animator.update";
import { configure } from "./Animator.configure";
import { prepare }   from "./Animator.prepare";
import { start }     from "./Animator.start";
import { dye }       from "./Animator.dye";
import { round }     from "./round";


class Animator {

	constructor( canvas, options = {} ){

		const element = typeof canvas === "string" ? document.getElementById(canvas) : canvas;
		if( !element )
			throw new Error("Canvas element not supplied.")

		element.addEventListener("click", this.pause.bind(this));


		this.context  = element.getContext("2d");
		this.loop     = null;
		this.paused   = false;
		
		this.siteswap = null;
		this.balls    = [];


		// Default settings.
		const animator = this;
		this.settings = {

         // Configurable by `this.configure`.
         _dwell: 0.5,             // Affected by siteswap synchronicity and slowdown. Getter below.
         dwellStep: 0.25,
         slowdown: 1,
         reversed: false,
         ballColor: "#ff3636",
         beatDuration: 300,         // In miliseconds.

         // Not configurable.
			ballRadius: 100,         // In milimetres.
			catchWidth: 400,         // In milimetres.
			innerHeight: 0,          // In milimetres. Set by `.scale()`.
			innerWidth: 0,           // In milimetres. Set by `.scale()`.
			catchHeight: 0,          // In milimetres. Set by `.scale()`.

			multiplier: null,        // Pixels per milimetre.


			// Computed properties.
			get multiplexTwinLimit(){
				return 1 / this.dwellStep - 1;
			},

			get handsGap(){
				if( animator.siteswap === null )
					throw new Error("Can't compute `handsGap` without a siteswap.");
				return (Math.max(0.2, (9-3) / 9 / 10 * animator.siteswap.greatestValue) + (animator.siteswap.degree === 2 ? 0.2 : 0)) * 1000;
			},
			get dwell(){
				if( animator.siteswap === null )
					throw new Error("Can't compute `dwell` without a siteswap.");
				return animator.siteswap.degree === 1 ? round(this._dwell * 2) : this._dwell;
			},

			set dwell( value ){  this._dwell = value;  },

		};

		this.configure(options);

	}
}

Animator.prototype.start     = start;
Animator.prototype.pause     = pause;
Animator.prototype.stop      = stop;
Animator.prototype.scale     = scale;
Animator.prototype.update    = update;
Animator.prototype.configure = configure;
Animator.prototype.prepare   = prepare;
Animator.prototype.dye       = dye;


export { Animator };