
function draw(){

	const context = this.context;
	const settings = this.settings;
	const radius = settings.ballRadius * settings.multiplier;
	for( const ball of this.balls ){
		const x = ball.position.x * settings.multiplier;
		const y = ball.position.y * settings.multiplier;
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI * 2);
		context.fillStyle = ball.color;
		context.globalAlpha = ball.position.y > 0 ? 0.9 : 0.55;
		context.fill();
		context.closePath();
	}

}

export { draw };