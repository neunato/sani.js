
function stop(){

   for( const ball of this.balls )
      ball.clear(this.context, this.settings);
   
   this.loop.kill();
   this.loop = null;
   this.siteswap = null;
   this.balls.length = 0;

}

export { stop };