
const rollup   = require("rollup");
const resolve  = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel    = require("babel-core");
const uglify   = require("uglify-js");


const t = {

   rollup:  (contents, file) => rollup.rollup({ input: file.path, plugins: [resolve(), commonjs()] })
                                 .then( bundle => bundle.generate({ format: "iife", name: "Animator" }) )
                                 .then( ({ code }) => code )
                                 .catch( handleRollupError ),

   uglify:  (contents, file) => { const options = { mangle: { reserved: ["Animator", "Ball"] }};
                                  const { code, error } = uglify.minify({ [file.path]: contents.toString() }, options);
                                  if( error )
                                    handleUglifyError(error);
                                  return code; },

   babel:   (contents, file) => { try {
                                    return babel.transform(contents, { presets: ["env"] }).code;
                                  } catch(e){ 
                                    handleBabelError(e)
                                  }
                                }

};


const configuration = {

  tasks: {

    "bundle": {
      watch: "src/*.js",
      parallel: ["bundle:js", "bundle:js:min"]
    },

    "bundle:js": {
      src: "src/entry.js",
      rename: "dist/sani.js",
      transforms: [t.rollup]
    },

    "bundle:js:min": {
      src: "src/entry.js",
      rename: "dist/sani.min.js",
      transforms: [t.rollup, t.babel, t.uglify]
    },

    "default": {
      series: ["bundle", "watch"]
    }

  }

};

require("glupost")(configuration);





// Convert plugin specific errors to a generic form.

function handleRollupError({ name, message, loc, frame }){

   let output = "\nRollup errored out\n\n";
   output += ` ${name}: ${message}\n`;
   if( loc )
      output += `     at ${loc.file}:${loc.line}:${loc.column}\n`;
   if( frame )
      output += `\n${frame.replace(/^/mg, " ")}\n`;
   throw output;

}

function handleBabelError({ name, message, loc, codeFrame: frame }){

   let output = "\nBabel errored out\n\n";
   output += ` ${name}: ${message}\n`;
   if( frame )
      output += `\n${frame.trim().replace(/^/mg, " ")}\n`;
   throw output;

}

function handleUglifyError({ name, message, filename, line, col }){

   let output = "\nUglify errored out\n\n";
   output += ` ${name}: ${message}\n     at ${filename}:${line}:${col}\n\n`;
   throw output;

}
