
function clear(){

	// Clear an additional 2px pixels of width to fix occasional subpixel trails.
	const settings = this.settings;
	const width = (settings.ballRadius * settings.multiplier + 2) * 2;
	for( const ball of this.balls ){
		const x = ball.position.x * settings.multiplier - width / 2;
		const y = ball.position.y * settings.multiplier - width / 2;
		this.context.clearRect(x, y, width, width);
	}

}

export { clear };