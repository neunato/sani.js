
<template>
   <div id="animator-resize" @click.stop @mousedown.stop="start"></div>
</template>


<script>

import { storage } from "./shared"

export default {

   data: () => ({
      dragging: false
   }),

   created(){
      this.$emit("update:resize", storage.get("resize") || 100)
   },

   mounted(){
      window.addEventListener("blur", (e) => this.stop(e))
      window.addEventListener("mouseup", () => this.stop())
      window.addEventListener("mousemove", (e) => this.drag(e))
   },

   methods: {
      start( e ){
         if( e.button === 0 )
            this.dragging = true
      },

      stop(){
         this.dragging = false
      },

      drag( e ){
         if( !this.dragging )
            return

         const left = e.clientX - this.$el.offsetWidth / 2
         storage.set("resize", left)
         this.$emit("update:resize", left)
         e.preventDefault()
      }
   }

}

</script>