
<template>
   <input :value="value" @input="$emit('input', $event.target.value)" :style="{ fontSize }">
</template>


<script>

export default {

   props: {
      value: String
   },

   data: () => ({
      context: document.createElement("canvas").getContext("2d"),
      width: null,
      minSize: 15,
      maxSize: 100
   }),

   computed: {

      fontSize(){

         // Since we can't access input element on first computation (before mounting) and the function returns 
         // before accessing `this.value`, the `fontSize` property would not depend on it for recomputation, 
         // unless explicitly accessed like this.
         this.value

         if( !this.width )
            return this.maxSize

         const multiplier = this.width / this.context.measureText(this.value).width
         return Math.max(this.minSize, Math.min(this.maxSize, multiplier)) + "px"

      }

   },

   mounted(){

      // `getComputedStyle` is fucked up on several levels:
      // - `.getPropertyValue` inconsistently returns units (with values) for some properties,
      //    but font-size always has units. Some `parseInt`s are intentionally redundant.
      // - `getComputedStyle` should be live, but it's not.
      // - `getComputedStyle` should be read-only, but it's not.
      const style = window.getComputedStyle(this.$el, null)
      this.context.font = `${style["font-style"]} ${style["font-variant"]} ${style["font-weight"]} 1px ${style["font-family"]}`
      this.width = parseInt(style["width"]) - parseInt(style["padding-left"]) * 2

      this.$el.focus()

   }

}

</script>
