
<template>
   <section id="settings">
      <div id="settings-toggle" @click="collapse">
         <p>SETTINGS</p>
         <img src="app/assets/expand.png">
         <div class="expand"></div>
      </div>

      <vue-scroll class="vertical" :ops="{ scrollPanel: { scrollingX: false } }">
         <div v-for="({ label, options, selected }, name) of configuration" class="setting" :class="name">
            <p>{{ label }}</p>
            <ul>
               <li v-for="({ style, label }, index) of options" :class="{ selected: index === selected }" :style="style" @click="updateSetting(name, index)">{{ label }}</li>
            </ul>
         </div>
      </vue-scroll>

   </section>
</template>


<script>


import { storage }   from "./shared"
import { randomInt } from "./shared"

import Vue           from "vue"
import vuescroll     from "vuescroll/dist/vuescroll-native.min"
Vue.use(vuescroll, { ops: { bar: { onlyShowBarOnScroll: false } } })


export default {

   data(){

      const settings = storage.get("settings") || {}
      const collapsed = storage.get("collapsed") || false

      // Default settings.
      const configuration = {
         "slowdown": {
            label: "Animation speed (%)",
            options: [{ value: 3, label: "33" }, { value: 2, label: "50" }, { value: 1, label: "100" }],
            selected: 2
         },
         "beatDuration": {
            label: "Juggling speed",
            options: [{ value: 400, label: "Slow" }, { value: 333, label: "Normal" }, { value: 267, label: "Fast" }],
            selected: 1
         },
         "dwell": {
            label: "Dwell time (%)",
            options: [{ value: 0.25, label: "25" }, { value: 0.5, label: "50" }, { value: 0.75, label: "75" }],
            selected: 1
         },
         "reversed": {
            label: "Direction",
            options: [{ value: false, label: "Normal" }, { value: true, label: "Reversed" }],
            selected: 0
         },
         "ballColor": {
            label: "Ball color",
            options: [{ value: "#ff3636", style: { backgroundColor: "#ff3636" } }, { value: "#e0c36b", style: { backgroundColor: "#e0c36b" } }, { value: "#31cc64", style: { backgroundColor: "#31cc64" } }, { value: "#ae65ed", style: { backgroundColor: "#ae65ed" } }, { value: "#4888EF", style: { backgroundColor: "#4888EF" } }],
            selected: randomInt(0, 4)
         }
      }
      
      // Synchronise `settings` with default configurations, that is, initial configurations with stored settings.

      const entries = Object.entries(configuration)
      for( const [key, config] of entries ){
         if( !settings[key] )
            settings[key] = config.options[config.selected].value
         else
            config.selected = config.options.findIndex( ({ value }) => value === settings[key] )
      }

      if( !storage.get("settings") )
         storage.set("settings", settings)

      return {
         settings,
         configuration,
         collapsed
      }
   
   },

   created(){

      this.$emit("update:settings", this.settings)
      this.$emit("update:collapsed", this.collapsed)

   },

   methods: {

      collapse(){

         this.collapsed = !this.collapsed
         storage.set("collapsed", this.collapsed)
         this.$emit('update:collapsed', this.collapsed)

      },

      updateSetting( name, index ){

         const config = this.configuration[name]
         config.selected = index

         // We're watching `settings` in parent which is why we want a new object.
         this.settings = Object.assign({}, this.settings, { [name]: config.options[index].value })
         storage.set("settings", this.settings)
         this.$emit("update:settings", this.settings)

      }

   }

}

</script>