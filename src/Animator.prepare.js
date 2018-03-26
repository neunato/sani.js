
import { Ball }            from "./Ball";
import { ThrowAnimation }  from "./Animator.prepare.ThrowAnimation";
import { CatchAnimation }  from "./Animator.prepare.CatchAnimation";
import { WaitAnimation }   from "./Animator.prepare.WaitAnimation";
import { round }           from "./round";
import { lcm }             from "./lcm";


const gravity = { x: 0, y: -9.81 / 1000 };


// These are used to cache some computations and are essential for 
// scaling and centering the animation. Reset on every `.prepare()`.

let catchHeights = null;
let throwHeights = null;
let throwVelocities = null;

function calcThrowVelocity( airTime, beatDuration ){

	if( throwVelocities[airTime] === undefined )
		throwVelocities[airTime] = Math.sqrt(2 * -gravity.y * calcThrowHeight(airTime, beatDuration));

	return throwVelocities[airTime];

}

function calcThrowHeight( airTime, beatDuration ){

	if( throwHeights[airTime] === undefined )
		throwHeights[airTime] = -gravity.y / 8 * Math.pow(airTime * beatDuration, 2);
	
	return throwHeights[airTime];

}

function calcCatchHeight( value, beatDuration, dwell ){

   if( catchHeights[value] === undefined ){

      const bps = 1 / beatDuration;

		// Higher throw means higher catch. 
		const factor1 = value * 0.04;

		// Greater speed means lower catch.
		const factor2 = (3 - bps) * factor1 * 0.4;

		// Greater dwell means higher catch.
		const factor3 = (dwell - 0.5) * 0.5 * factor1 * 0.4;

		catchHeights[value] = (factor1 + factor2 + factor3) * 1000;
	}

	return catchHeights[value];

}


// When dwell time is greater than a full beat and there are throw 
// value(s) of 1, dwell time for that action has to be diminished
// to `1 - dwellStep`.

function normaliseDwellTime( dwellTime, dwellStep, multiplexes ){

	if( dwellTime >= 1 ){
		const ones = multiplexes.reduce( (sum, map) => Math.max(sum, map["1-0"] || 0, map["1-1"] || 0), 0);
		if( ones > 0 )
			return round(1 - dwellStep, 2);
	}

	return dwellTime;

}


// This one is used to synchronise tosses and releases when
// there are multiplex twin tosses.

function calcTimes( value, dwell, dwellStep, mpxPosition, mpxCount ){

	const waitTime   = round((mpxCount - 1 - mpxPosition) * dwellStep, 2);
	const launchTime = Math.max(dwellStep, round(dwell - (mpxCount - 1) * dwellStep, 2));
	const airTime    = round(value - (waitTime + launchTime), 2);

	return {
		waitTime,
		launchTime,
		airTime
	};

}


// Adjust the throw sequence of async patterns by changing the 
// hand sequence from `l` to `l,r`. This should possibly be taken 
// care of on the `Siteswap` level, after some careful devising 
// (one problem being representing a 3 as 3l3r).

// Thinking about this now, it actually might be best to simply 
// convert async to sync ("3" -> "(6x,0)*") and provide an option 
// here to consume that extra beat with the ball still in hand.
// This raises the question of how would "522" behave? Will it 
// consume the third beat?

function strictifyThrows( siteswap ){

	if( siteswap.degree === 2 ){
		return siteswap.throws;
	}

	const throws = [];
	const n = lcm( siteswap.throws.length, 2 );
	for( let i = 0; i < n; i++ ){
		const action = [[], []];
		const release = siteswap.throws[i % siteswap.throws.length][0].map( toss => ({ value: toss.value, handFrom: i % 2, handTo: (i + toss.value) % 2 }) );
		action[i % 2] = release;
		throws.push( action );
	}

	return throws;

}



// Assign the appropriate animations to balls, which are looped over in `Ball.prototype.update`.

function prepare(){

	const siteswap = this.siteswap;
	const settings = this.settings;

	this.balls = Array(siteswap.props).fill().map( () => new Ball(settings.ballColor) );

	// Reset cache.
	catchHeights = {};
	throwHeights = {};
	throwVelocities = {};

	const beatDuration = settings.beatDuration;
	const catchWidth = settings.catchWidth;
	const innerWidth = settings.catchWidth * 2 + settings.handsGap;

	const throws = strictifyThrows(siteswap);
	const n = lcm( throws.length, siteswap.strictStates.length );
	for( let i = 0; i < n; i++ ){

		const action = throws[i % throws.length];
		const schedule = siteswap.strictStates[i % siteswap.strictStates.length].schedule;

		// Determine greatest multiplex count of same throw values. This has to include both hands
		// (if used) as throws happen at the same time, even if one hand has no multiplex tosses.
		// `([553])` => [{ '5-0': 2, '3-0': 1 }]
		const multiplexes = action.map(function(release){
			return release.reduce(function(result, toss){
				const key = `${toss.value}-${toss.handTo}`;
				result[key] = (result[key] || 0) + 1;
				return result;
			}, {});
		});


		const greatestTwinCount = Math.max( ...multiplexes.map(group => Math.max(...Object.keys(group).map(key => group[key])) ));
		const dwellTime = normaliseDwellTime(settings.dwell, settings.dwellStep, multiplexes);

		for( let h = 0; h < 2; h++ ){

			const release = action[h];

			// "Hand motion" follows the lowest toss when multiplexing.
			const lowestValue = Math.min( ...release.map(({value}) => value) );

			for( let j = 0; j < release.length; j++ ){

				const toss = release[j];
				if( toss.value === 0 )
					continue;
					
				const ball = this.balls[ schedule[h % siteswap.degree][0][j] - 1 ];

				const { waitTime, launchTime, airTime } = calcTimes(toss.value, dwellTime, settings.dwellStep, --multiplexes[h][toss.value + "-" + toss.handTo], greatestTwinCount);
				
				
				// Catch animation.
				{
				let x1 = toss.handFrom === 0 ? 0 : innerWidth;
				let x2 = toss.handFrom === 0 ? catchWidth : innerWidth - catchWidth;

				if( settings.reversed )
					[x1, x2] = [x2, x1];

				const height = calcCatchHeight( lowestValue, beatDuration, dwellTime );
				ball.animations.push( new CatchAnimation(launchTime * beatDuration, x1, x2, height) );
				}


				// Throw animation.
				{
				let x1 = toss.handFrom === 0 ? catchWidth : innerWidth - catchWidth;
				let x2 = toss.handTo === 0 ? 0 : innerWidth;

				if( settings.reversed ){

					if( toss.handFrom === toss.handTo ){
						[x1, x2] = [x2, x1];
					}
					else{
						x1 += toss.handFrom === 0 ? -catchWidth : catchWidth;
						x2 += toss.handFrom === 0 ? -catchWidth : catchWidth;
					}

				}

				const position = {
					x: x1,
					y: 0
				};

				const velocity = {
					x: (x2 - x1) / (airTime * beatDuration),
					y: calcThrowVelocity(airTime, beatDuration)
				};

				ball.animations.push( new ThrowAnimation(airTime * beatDuration, position, velocity, gravity) );

				// Wait animation.
				if( waitTime > 0 ){
					ball.animations.push( new WaitAnimation(waitTime * beatDuration, x2, 0) );
				}
					
				}
			}
		}
	}

	// Once the throw/catch heights in metres are known, we can assign `innerWidth` 
	// and `innerHeight` which will be used for scaling and centering.
	const greatestThrowHeight = Math.max( ...Object.keys(throwHeights).map(key => throwHeights[key]) );
	const greatestCatchHeight = Math.max( ...Object.keys(catchHeights).map(key => catchHeights[key]) );
	const innerHeight = greatestThrowHeight + greatestCatchHeight;

	this.scale(innerWidth, innerHeight, greatestCatchHeight);



   // Delay initial animations.
   const schedule = siteswap.strictStates[0].schedule;
   for( const state of schedule ){
      for( let beat = 0; beat < state.length; beat++ ){
         for( const id of state[beat] ){
            this.balls[id - 1].animations[-1] = new WaitAnimation(beat * beatDuration)
            this.balls[id - 1].animationAt = -1
         }
      }
   }


}

export { prepare };