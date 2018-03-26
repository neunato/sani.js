
import { Spline } from "./spline";

// All catch animations use the same spline for their trajectories.
// This should probably be expanded to a few splines for different
// types of throws (for example, to same vs to other hand).

const points = [
	{ x: 0,   y: 0   },
	{ x: 5,   y: 30  },
	{ x: 30,  y: 100 },
	{ x: 95,  y: 30  },
	{ x: 100, y: 0   }
];

const spline = new Spline(points);


class CatchAnimation {

	constructor( duration, x1, x2, height ){

      this.duration = duration;
		this.width = (x2 - x1);
		this.yModifier = height / spline.maximum().y;
		this.position = {
			x: x1,
			y: 0
		};

	}

	getPosition( time ){

      const percent = time / this.duration
		const position = {
			x: this.position.x + percent * this.width,
			y: this.position.y - spline.at(percent * 100) * this.yModifier
		};
		return position;

	}

}

export { CatchAnimation };