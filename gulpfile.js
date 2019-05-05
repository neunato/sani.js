
"use strict"      // eslint-disable-line strict


const fs = require("fs-extra")
const rollup = require("rollup")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const minify = require("babel-minify")


const t = {

   rollup(contents, file) {
      return rollup.rollup({ input: file.path, plugins: [resolve(), commonjs()] })
         .then((bundle) => bundle.generate({ format: "iife", name: "Animator" }))
         .then(({ code }) => code)
   },

   minify(contents) {
      return minify(contents, { mangle: { exclude: ["Animator", "Siteswap"] }, mergeVars: /* for some reason this breaks something */ false }).code
   }

}


const configuration = {

   tasks: {
      "build": {
         watch: "src/*.js",
         series: ["build:worker", "build:js", () => fs.removeSync("./src/workers/")]
      },

      "build:js": {
         src: "src/_entry.js",
         dest: "dist/",
         rename: "sani.js",
         transforms: [t.rollup, t.minify]
      },

      "build:worker": {
         src: "./node_modules/gif.js/dist/gif.worker.js",
         dest: "src/workers/",
         rename: "gif.js",
         transforms: [(contents) => `export default \`${contents}\``]
      },

      "default": {
         series: ["build", "watch"]
      }
   }

}

require("glupost")(configuration)
