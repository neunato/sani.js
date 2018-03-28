

class Loop {
      
   constructor( callback ){
      
      this.callback  = callback
      this.update    = this.update.bind(this)
      this.request   = window.requestAnimationFrame(this.update)
      this.timestamp = 0

   }

   update( now ){

      const delta = now - this.timestamp
      this.timestamp = now
      this.request = window.requestAnimationFrame(this.update)
      this.callback(delta)

   }

   kill(){

      window.cancelAnimationFrame(this.request)

   }

}

export { Loop }