
import { pause }     from "./Animator.pause";
import { stop }      from "./Animator.stop";
import { clear }     from "./Animator.clear";
import { draw }      from "./Animator.draw";
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
		this.request  = null;
		this.paused   = false;
		
		this.siteswap = null;
		this.balls    = [];


		// Default settings.
		const animator = this;
		this.settings = {

			// User configurable by `this.configure`. `dwell` and `fpb` are affected by the siteswap
			// synchronicity and slowdown. That's the why for setters/getters.
			_dwell: 0.5,
			_fpb: 20,
			_fps: 60,

			slowdown: 1,
			reversed: false,
			ballColor: "#ff3636",

			dwellStep: 0.25,

			// In metres.
			ballRadius: 0.1,
			catchWidth: 0.4,
			innerHeight: 0,    // `.scale(innerWidth, innerHeight, catchHeight)` sets them.
			innerWidth: 0,
			catchHeight: 0,

			multiplier: null,

			// In pixels.
			ballRadiusLimit: 5,


			// Computed properties.
			get multiplexTwinLimit(){
				return 1 / this.dwellStep - 1;
			},
			get handsGap(){
				if( animator.siteswap === null )
					throw new Error("Hmmm.");
				return Math.max(0.2, (9-3) / 9 / 10 * animator.siteswap.greatestValue) + (animator.siteswap.degree === 2 ? 0.2 : 0);
			},
			get dwell(){
				if( animator.siteswap === null )
					throw new Error("Hmmm.");
				return animator.siteswap.degree === 1 ? round(this._dwell * 2) : this._dwell;
			},
			get fpb(){
				if( animator.siteswap === null )
					throw new Error("Hmmm.");
				return round(this._fpb * animator.siteswap.degree * this.slowdown);
			},
			get fps(){
				return this._fps * this.slowdown;
			},
			get bps(){
				return this.fps / this.fpb;
			},

			set dwell( value ){  this._dwell = value;  },
			set fpb( value ){  this._fpb = value;  }

		};

		this.configure(options);

	}
}

Animator.prototype.start     = start;
Animator.prototype.pause     = pause;
Animator.prototype.stop      = stop;
Animator.prototype.draw      = draw;
Animator.prototype.clear     = clear;
Animator.prototype.scale     = scale;
Animator.prototype.update    = update;
Animator.prototype.configure = configure;
Animator.prototype.prepare   = prepare;
Animator.prototype.dye       = dye;


export { Animator };