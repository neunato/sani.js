
class WaitAnimation {

	constructor( frameCount, x, y ){

		this.frameCount = frameCount;
		this.position = { x, y };

	}

	nextPosition( frameAt ){

		return this.position;

	}

}


export { WaitAnimation };