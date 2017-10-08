
// Resizes the canvas, scales and centers animation. Optionally, the sizes in metres can be
// set (happens in `.prepare()` when the animations are calculated).

function scale( width, height, catchHeight ){

	const canvas = this.context.canvas;
	const settings = this.settings;

	// Set new inner size, in metres.
	if( width && height && catchHeight ){
		settings.innerWidth = width;
		settings.innerHeight = height;
		settings.catchHeight = catchHeight;
	}

	// Set new canvas size.
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	// Convert metres to pixels.
	settings.multiplier = Math.max(0, Math.min(
		canvas.width / (settings.innerWidth + settings.ballRadius * 2),
		canvas.height / (settings.innerHeight + settings.ballRadius * 2)
	));

	// Center the animation by translating the canvas. This adjusts for the internal y-origin that
	// matches catch height and the required offset of one screen as y axis will be inverted.
	const surplus = {
		x: Math.max(0, canvas.clientWidth - (settings.innerWidth + settings.ballRadius * 2) * settings.multiplier),
		y: Math.max(0, canvas.clientHeight - (settings.innerHeight + settings.ballRadius * 2) * settings.multiplier)
	};
	const offset = {
		x: surplus.x * 0.5 + settings.ballRadius * settings.multiplier,
		y: surplus.y * 0.5 + settings.ballRadius * settings.multiplier
	};


	this.context.translate(offset.x, canvas.height - offset.y - settings.catchHeight * settings.multiplier);
	
	// Invert y axis.
	this.context.scale(1, -1);

};

export { scale };