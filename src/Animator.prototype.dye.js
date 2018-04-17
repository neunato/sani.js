
import { clear } from "./clear"

const _settings = Symbol.for("settings")
const _paused = Symbol.for("paused")
const _balls = Symbol.for("balls")
 

// `id` is an integer assigned to balls (in order of appearance?).

function dye( color, id ){

   const balls = this[_balls];
   const settings = this[_settings];
   const context = this.context;

   if( id === undefined ){
      for( const ball of balls )
         ball.color = color;
   }
   else{
      if( !balls[id] )
         throw new Error("Ball doesn't exist.");
      balls[id].color = color;
   }
   

   if( this[_paused] ){
      clear(context);
      for( const ball of balls )
         ball.draw(context, settings);
   }

}

export { dye };