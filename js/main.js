
"use strict"

document.addEventListener("DOMContentLoaded", function(){



// Helpers.

Element.prototype.listen  = Element.prototype.addEventListener
Document.prototype.listen = Document.prototype.addEventListener
Window.prototype.listen   = Window.prototype.addEventListener

function get( selector, context ){    return (context ? context : document).querySelector( selector ) }
function getAll( selector, context ){ return [...(context ? context : document).querySelectorAll( selector )] }

function random( array ){ return array[Math.floor(Math.random() * array.length)] }



// When `sessionStorage` is disabled.

let storage

try{
   storage = window.sessionStorage
}
catch(e){
   const data = {}
   storage = {
      getItem( name ){ return data.hasOwnProperty(name) ? data[name] : null },
      setItem( name, value ){ data[name] = value }
   }
}




// Globally accessible.

const animator = new Animator("animator-canvas")
const input = get('#animator-siteswap')



// Scale siteswap string to fit input box.

let fitInputText; {
   
   // `getComputedStyle` is fucked up on several levels:
   // - `.getPropertyValue` inconsistently returns units (with values) for some properties,
   //    but font-size always has units. Some `parseInt`s are intentionally redundant.
   // - `getComputedStyle` should be live, but it's not.
   // - `getComputedStyle` should be read-only, but it's not.

   const style = window.getComputedStyle(input, null)
   const inputWidth = parseInt(style["width"]) - parseInt(style["padding-left"]) * 2
   const context = document.createElement("canvas").getContext("2d")

   const maxSize = parseInt(style["font-size"])
   const minSize = 15

   // Must be shorthand for `context`, and can't be for `getComputedStyle`.
   const prefix = ["style", "variant", "weight"].map(prop => style[`font-${prop}`]).join(" ") + " "
   const postfix = "px " + style["font-family"]

   let size = style["font-size"].slice(0, -2)

   fitInputText = function(){
      context.font = prefix + size + postfix
      const multiplier = inputWidth / context.measureText(input.value).width
      size = Math.max(minSize, Math.min(maxSize, size * multiplier))
      input.style["font-size"] = `${size}px`
   }

}


// Display siteswap information.

let describeSiteswap; {

   function boolean( value ){
      return value ? "yes" : "no"
   }

   function logStates( states ){
      const siteswap = animator.siteswap
      if( siteswap.greatestValue === 0 )
         return "0"

      return states.map( state => state.map(function(handState){
         const from = handState.length
         handState = [...handState]
         handState.length = siteswap.greatestValue
         handState.fill("0", from)
         return handState.join(siteswap.multiplex > 9 ? "," : "")
      }).join("|") ).join("<br>")
   }

   function logSiteswaps( value ){
      return value.map(siteswap => `<span class="siteswap">${siteswap.toString()}</span>`).join("<br>")
   }


   const message = get("#siteswap-message")
   const properties = getAll(".siteswap-property")
   const composition = get(".siteswap-property[data-name=composition]")
   const processors = {
      "degree": v => v > 1 ? "synchronous" : "asynchronous",
      "multiplex": v => boolean(v > 1),
      "groundState": boolean,
      "prime": boolean,
      "states": logStates,
      "composition": logSiteswaps,
      "orbits": logSiteswaps
   }


   describeSiteswap = function(){

      const siteswap = animator.siteswap

      if( !siteswap.valid ){
         if( input.value === "" ){
            message.innerHTML = "Enter siteswap"
            input.className = "invalid empty"
         }
         else{
            message.innerHTML = "Invalid siteswap"
            input.className = "invalid"
         }
         return
      }

      message.innerHTML = ""
      input.className = ""

      for( const element of properties ){
         const name = element.dataset.name
         const processor = processors[name]
         element.nextElementSibling.innerHTML = processor ? processor(siteswap[name]) : siteswap[name]
      }

      composition.className = siteswap.composition.length > 1 ? "siteswap-property" : "siteswap-property hidden"

      const siteswaps = getAll("#siteswap-info .siteswap")
      for( const link of siteswaps ){
         link.listen("click", function(){
            input.value = link.innerHTML
            input.dispatchEvent(new Event("input"))
         })
      }

   }

}


// Configure animator with selected settings.

function configure(){
   
   const settings = getAll(".animator-setting .selected").reduce( function(result, button){
      const [key, value] = button.dataset.value.split('-')
      if( key === "reversed" )
         result[key] = value === "true"
      else if( key === "ballColor" )
         result[key] = value
      else
         result[key] = Number(value)
      return result
   }, {} )

   animator.configure(settings)

}


// Start the animator with input siteswap and describe it.

function juggle(){

   const string = input.value

   try{
      animator.start(string)
   } catch(e){}

   describeSiteswap()

}




// Initialisation.

{
   // Select stored/default settings and attach listeners.

   const settings = {
      beatDuration: "333",
      slowdown: "1",
      dwell: "0.5",
      reversed: "false",
   };

   const keys = Object.keys(settings)
   for( const key of keys ){
      const value = storage.getItem(key)
      if( value !== null )
         settings[key] = value
   }

   const ballColor = storage.getItem("ballColor")
   settings["ballColor"] = ballColor ? ballColor : random(getAll(".animator-setting.color li").map(({ dataset }) => dataset.value.split("-")[1]))


   const buttons = getAll("#animator-nav .animator-setting li")
   for( const button of buttons ){

      const [key, value] = button.dataset.value.split('-')

      if( settings[key] === value )
         button.className = "selected"

      if( key === "ballColor" )
         button.style.backgroundColor = value

      button.listen("click", function(){
         if( this.className === "selected" )
            return

         const selected = get(".selected", this.parentNode)
         if( selected )
            selected.className = ""
         this.className = "selected"


         configure()
         if( key === "ballColor" )
            animator.dye(value)
         else if( key !== "slowdown" )
            juggle()


         storage.setItem(key, value);
      });

   }


   // Input stored/default siteswap and attach listener.

   let current = storage.getItem("siteswap")

   input.value = current === null ? random(["4", "5", "7", "645", "753", "(6x,4)*"]) : current

   input.listen("input", function(){
      const value = this.value.trim()
      if( value === current )
         return
      current = value
      storage.setItem("siteswap", value)


      animator.stop()
      fitInputText()
      juggle()
   })


   // Listen for escape (stop), enter (restart) and space (pause) buttons.

   document.listen("keydown", function(e){
      if( e.keyCode === 27 ){    // Escape.
         input.value = ""
         input.dispatchEvent(new Event("input"))
      }
   })

   document.listen("keypress", function(e){
      if( e.keyCode === 13 )     // Enter.
         juggle()
      else if( e.keyCode === 32 && input !== document.activeElement )  // Space.
         animator.pause()
   })


   // Pause on canvas click.

   const main = get("#animator-main")
   main.listen("click", () => { if( !dragging ) animator.pause() })


   // Resize bar mechanics.

   let dragging = false
   const bar = get("#animator-resize")
   bar.listen("click", e => e.stopPropagation())
   bar.listen("mousedown", (e) => { if(e.button === 0) dragging = true })
   window.listen("blur",    () => dragging = false)
   window.listen("mouseup", () => window.setTimeout(() => dragging = false))  // Because resize is a child of main.
   window.listen("mousemove", function(e){
      if( !dragging )
         return
      const width = (window.innerWidth - e.clientX + bar.offsetWidth / 2) + "px"
      main.style.right = width
      storage.setItem("canvas-width", width)
      e.preventDefault()
   })
  
   const width = storage.getItem("canvas-width")
   if( width )
      main.style.right = width


   // Expand/collaps settings box.

   const body = document.body
   get("#controls-toggle").listen("click", function(){
      body.className = body.className === "" ? "configuring" : ""
      storage.setItem("settings-collapsed", body.className === "")
   })

   const collapsed = storage.getItem("settings-collapsed") || (window.innerHeight <= 800).toString()
   if( collapsed === "true" )
      body.className = ""
   

   // Remove `loading` class from overlay and remove loader after transition.

   get("#overlay").listen("transitionend", function(){
      const loader = get("#loader")
      if( !loader )     // This also guards againts multiple transitionends.
         return

      this.removeChild(loader)
      input.focus()
      animator.pause()
   })


   // Populate HTML (describe siteswap), and pause the animator until overlay's gone.

   configure()
   juggle()
   animator.pause()
   window.setTimeout(fitInputText, 20)


   get("#overlay").className = ""

}

})
