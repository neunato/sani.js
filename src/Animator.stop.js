
function stop(){

   this.clear();
   this.loop.kill();
   this.loop = null;
   this.siteswap = null;
   this.balls.length = 0;

}

export { stop };