
<template>
   <section id="siteswap">
      <app-input v-model="input" :class="{ invalid: !siteswap.valid && trimmedInput }" @input="$emit('update:siteswap', siteswap); makeHistory()" ref="input"></app-input>
      
      <div id="siteswap-info">
         <p v-if="!siteswap.valid">{{ trimmedInput ? "Invalid siteswap" : "Enter siteswap" }}</p>
         <vue-scroll v-else class="horizontal vertical">
            <dl><template v-for="{ name: prop, label, processor } of properties">
               <dt class="siteswap-property" :data-name="prop">{{ label }}</dt>

               <dd v-if="!processor">{{ siteswap[prop] }}</dd>
               <dd v-else-if="processor === 'boolean'">{{ siteswap[prop] ? "yes" : "no" }}</dd>
               <dd v-else-if="processor === 'degree'">{{ siteswap[prop] === 1 ? "asynchronous" : "synchronous" }}</dd>
               <dd v-else-if="processor === 'siteswaps'">
                  <template v-for="ss of siteswap[prop]">
                     <span class="siteswap" @click="input = $event.target.innerHTML; $emit('update:siteswap', siteswap); makeHistory()">{{ ss.toString() }}</span>
                  </template>
               </dd>
               <dd v-else-if="processor === 'states'" v-html="siteswapStates"></dd>
            </template>
         </dl></vue-scroll>
      </div>

   </section>
</template>



<script>

import { storage }       from "./shared"
import { randomElement } from "./shared"
import AppInput          from "./app-input.vue"

import Vue               from "vue"
import vuescroll         from "vuescroll/dist/vuescroll-native.min"
Vue.use(vuescroll, { ops: { bar: { onlyShowBarOnScroll: false } } })


export default {

   components: {
      AppInput
   },

   data(){

      let input = storage.get("siteswap")
      if( input === null )
         input = randomElement(["4", "5", "7", "645", "753", "(6x,4)*"])

      return {
         input,                                        // Input value, the actual siteswap is in `.siteswap`.
         properties: [                                 // Siteswap properties.
            { name: "degree", label: "Type", processor: "degree" },
            { name: "props", label: "Balls" },
            { name: "period", label: "Period" },
            { name: "fullPeriod", label: "Full period" },
            { name: "multiplex", label: "Multiplex" },
            { name: "groundState", label: "Ground state", processor: "boolean" },
            { name: "prime", label: "Prime", processor: "boolean" },
            { name: "composition", label: "Composition", processor: "siteswaps" },
            { name: "orbits", label: "Orbits", processor: "siteswaps" },
            { name: "states", label: "States", processor: "states" }
         ]
      }

   },

   methods: {

      // We keep track of valid siteswaps history + last one regardless of validity.
      makeHistory(){
         if( history.state && history.state.valid )
            history.pushState(this.state, "")
         else
            history.replaceState(this.state, "")
      }

   },

   computed: {

      trimmedInput(){
         return this.input.trim()
      },

      siteswap(){
         storage.set("siteswap", this.input)
         return new Animator.Siteswap(this.trimmedInput)
      },
      
      siteswapStates(){
         const { greatestValue, multiplex } = this.siteswap
         if( !greatestValue )
            return "0"
         const sep = multiplex > 9 ? "," : ""
         return this.siteswap.states.map( state => state.map( (handState) => [...handState].concat(Array(greatestValue - handState.length).fill(0)).join(sep) ).join("|") ).join("<br>")
      },

      state(){
         return {
            siteswap: this.input,
            valid: this.siteswap.valid
         }
      }

   },

   created(){

      this.$emit('update:siteswap', this.siteswap)

      history.replaceState(this.state, "")

      // Moving through history updates siteswap.
      window.addEventListener("popstate", (e) => {
         this.input = e.state.siteswap
         this.$emit('update:siteswap', this.siteswap)
      })

      // Escape clears inputted siteswap.
      document.addEventListener("keydown", (e) => {
         if( e.keyCode === 27 ){
            this.input = ""
            this.$emit("update:siteswap", null)
            this.$refs.input.$el.focus()
         }
      })

   }

}

</script>

