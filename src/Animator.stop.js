
function stop(){

	window.cancelAnimationFrame(this.request);
   this.clear();
   this.request = null;
   this.siteswap = null;
   this.balls.length = 0;

}

export { stop };