
const _settings = Symbol.for("settings");
 
 
function configure( options ){

   const settings = this[_settings];

   if( options.beatDuration !== undefined )
      settings.beatDuration = options.beatDuration;

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

	// Get the unaffected _dwell value.
	const { beatDuration, _dwell: dwell, dwellStep, slowdown, ballColor, reversed } = settings;

   if( typeof beatDuration !== "number" )
      throw new Error("Invalid configuration (`beatDuration` must be a number).");
   if( beatDuration <= 0 )
      throw new Error("Invalid configuration (`beatDuration` must be positive).");

	if( typeof slowdown !== "number" )
		throw new Error("Invalid configuration (`slowdown` must be a number).");
	if( slowdown <= 0 )
		throw new Error("Invalid configuration (`slowdown` must be positive).");

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

	if( typeof ballColor !== "string" )
		throw new Error("Invalid configuration (`ballColor` must be a string).");
	if( !/^#[0-9a-f]{3}(?:[0-9a-f]{3})?/i.test(ballColor) )
		throw new Error("Invalid configuration (`ballColor` must be a valid css color).");

	if( typeof reversed !== "boolean" )
		throw new Error("Invalid configuration (`reversed` must be a boolean).");

}

export { configure };