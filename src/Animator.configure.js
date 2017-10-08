
// Will `Number.isInteger()` ever fail due to rounding issues?
// If so, use `.round` with every calculation.

function configure( options ){

	const settings = this.settings;

	if( options.fpb !== undefined )
		settings.fpb = options.fpb;

	if( options.slowdown !== undefined )
		settings.slowdown = options.slowdown;

	if( options.dwell !== undefined )
		settings.dwell = options.dwell;

	if( options.dwellStep !== undefined )
		settings.dwellStep = options.dwellStep;

	if( options.ballColor !== undefined )
		settings.ballColor = options.ballColor;

	if( options.reversed !== undefined )
		settings.reversed = options.reversed;

	// Get the fpb and dwell values unaffected by siteswap degree.
	const { _fpb: fpb, _dwell: dwell, dwellStep, slowdown, ballColor, reversed } = settings;

	if( typeof slowdown !== "number" )
		throw new Error("Invalid configuration (`slowdown` must be a number).");
	if( slowdown <= 0 )
		throw new Error("Invalid configuration (`slowdown` must be positive).");

	if( typeof fpb !== "number" )
		throw new Error("Invalid configuration (`fpb` must be a number).");
	if( fpb <= 0 )
		throw new Error("Invalid configuration (`fpb` must be positive).");

	if( typeof dwell !== "number" )
		throw new Error("Invalid configuration (`dwell` must be a number).");
	if( dwell < 0 || dwell > 1 )
		throw new Error("Invalid configuration (`dwell` must be in [0-1] range).");
	if( typeof dwellStep !== "number" )
		throw new Error("Invalid configuration (`dwellStep` must be a number).");
	if( dwellStep <= 0 )
		throw new Error("Invalid configuration (`dwellStep` must be positive).");
	if( dwellStep > dwell )
		throw new Error("Invalid configuration (`dwellStep` can't be greater than `dwell`).");
	if( dwell % dwellStep !== 0 )
		throw new Error("Invalid configuration (`dwell` must be a multiple of `dwellStep`).");

	if( !Number.isInteger(fpb * slowdown) )
		throw new Error("Invalid configuration (`fpb * slowdown` must be an integer).");
	if( !Number.isInteger(fpb * slowdown * dwell) )
		throw new Error("Invalid configuration (`fpb * slowdown * dwell` must be an integer).");
	if( !Number.isInteger(fpb * slowdown * dwellStep) )
		throw new Error("Invalid configuration (`fpb * slowdown * dwellStep` must be an integer).");

	if( typeof ballColor !== "string" )
		throw new Error("Invalid configuration (`ballColor` must be a string).");
	if( !/^#[0-9a-f]{3}(?:[0-9a-f]{3})?/i.test(ballColor) )
		throw new Error("Invalid configuration (`ballColor` must be a valid css color).");

	if( typeof reversed !== "boolean" )
		throw new Error("Invalid configuration (`reversed` must be a boolean).");

}

export { configure };