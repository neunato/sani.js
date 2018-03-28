
const _settings  = Symbol.for("settings")
const _balls = Symbol.for("balls")
const _loop  = Symbol.for("loop")


function stop(){

   const loop = this[_loop];
   if( !loop )
      return;

   const balls = this[_balls];
   const settings = this[_settings];

   for( const ball of balls )
      ball.clear(this.context, settings);
   
   loop.kill();
   this[_loop] = null;
   this.siteswap = null;
   balls.length = 0;

}

export { stop };