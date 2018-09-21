
class Loop {

   constructor(callback) {

      this.callback = callback
      this.update = this.update.bind(this)
      this.request = window.requestAnimationFrame(this.update)
      this.timestamp = null

   }

   update(now) {

      const delta = this.timestamp ? now - this.timestamp : 0
      this.timestamp = now
      this.request = window.requestAnimationFrame(this.update)
      this.callback(delta)

   }

   kill() {

      window.cancelAnimationFrame(this.request)

   }

}

export { Loop }
