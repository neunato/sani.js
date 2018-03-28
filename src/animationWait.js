
class WaitAnimation {

	constructor( duration, x, y ){

      this.duration = duration;
		this.position = { x, y };

	}

	getPosition(){

		return this.position;

	}

}


export { WaitAnimation };