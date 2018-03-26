
import { update } from "./Ball.update";


function Ball( color, frameOffset = 0 ){

	this.position = { x: NaN, y: NaN };
	this.color = color;

	this.animationAt = 0;
	this.animations = [];
   this.elapsed = 0;

}

Ball.prototype.update = update;


export { Ball };

