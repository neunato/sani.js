
import { update } from "./Ball.update";


function Ball( color, frameOffset = 0 ){

	this.position = { x: NaN, y: NaN };
	this.color = color;
	this.frameAt = frameOffset;

	this.animationAt = 0;
	this.animations = [];

}

Ball.prototype.update = update;


export { Ball };

