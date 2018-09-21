
// The `+ 0.00001` bit is taken from https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
// It seems to fix some rounding issues (like 1.005 => 1 instead of 1.01),
// but is "not foolproof for all numbers and it just works up to 3 d.p.".
// Hopefully nothing will break.

function round(float, precision = 1) {

   const tmp = Math.pow(10, precision)
   return Math.round((float + 0.00001) * tmp) / tmp

}

export { round }
