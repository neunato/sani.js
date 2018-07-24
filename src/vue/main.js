
import Vue from "vue"
import App from "./app.vue"
import FontFaceObserver from "fontfaceobserver"


// Once everything in DOM is parsed and loaded.

function loadDOM(){

   return new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve))

}

// Once font is ready.

function loadFont(){

   return (new FontFaceObserver("mono")).load(null, 20000)

}

// Once time passes.

function wait( ms ){

   return new Promise((resolve) => window.setTimeout(resolve, ms))

}


// Load everything and launch the application.

Promise.all([loadDOM(), loadFont(), wait(175)]).then( () => {

   // In case the script was not found.
   if( window.Animator ){
      new Vue({
         el: "#overlay",
         render: h => h(App),
         components: { App }
      })
   }

})