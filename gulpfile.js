
const rollup    = require("rollup")
const resolve   = require("rollup-plugin-node-resolve")
const commonjs  = require("rollup-plugin-commonjs")
const replace   = require("rollup-plugin-replace")
const vue       = require("rollup-plugin-vue").default
const minify    = require("babel-minify")
const less      = require("less")


const t = {

   rollup(contents, file){
      return rollup.rollup({ input: file.path, plugins: [
         replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' )
          }), 
         vue(),
         resolve(),
         commonjs()
      ] })
      .then( bundle => bundle.generate({ format: "iife" }) )
      .then( ({ code }) => code )
      .catch( handleRollupError )
   },

   minify(contents, file){
      try{
         return minify(contents).code
      }
      catch(e){
         handleMinifyError(e)
      }
   },

   less(contents, file){

      return less.render(contents.toString()).then( ({ css }) => css )

   }

}


const configuration = {

   tasks: {

      "build:js": {
         watch: "src/vue/",
         src: "src/vue/main.js",
         rename: "app/main.js",
         transforms: [t.rollup, t.minify]
      },

      "build:css": {
         watch: "src/less/",
         src: "src/less/main.less",
         rename: "app/main.css",
         transforms: [t.less]
      },

      "build": {
         parallel: ["build:js", "build:css"]
      },

      "default": {
         series: ["build", "watch"]
      }

   }

};

require("glupost")(configuration);




function handleRollupError({ name, message, loc, frame }){

   let output = "\nRollup errored out\n\n"
   output += ` ${name}: ${message}\n`
   if( loc )
      output += `     at ${loc.file}:${loc.line}:${loc.column}\n`
   if( frame )
      output += `\n${frame.replace(/^/mg, " ")}\n`
   throw output

}

function handleMinifyError({ name, message }){

   throw `\nMinify errored out\n\n ${name}: ${message}\n`

}
