

function randomInt( min, max ){

   return Math.floor(Math.random() * (max - min + 1)) + min;

}

function randomElement( array ){

   return array[randomInt(0, array.length - 1)]

}



// In case `sessionStorage` is disabled.

if( !window.sessionStorage ){

   const data = {}
   sessionStorage = {
      setItem( key, value ){
         data[key] = value
      },
      getItem( key ){
         return data.hasOwnProperty(key) ? data[key] : null
      }
   }

}

// Wrapper around `sessionStorage` that converts to JSON and back.

const storage = {
   set( key, value ){
      try{
         window.sessionStorage.setItem(key, JSON.stringify(value))
      }
      catch(e){
         console.warn("Failed writing to `sessionStorage`.")
      }
   },
   get( key ){
      try{
         return JSON.parse(window.sessionStorage.getItem(key))
      }
      catch(e){
         console.warn("Failed reading from `sessionStorage`.")
         return null
      }
   }
}


export {
   storage,
   randomInt,
   randomElement
}