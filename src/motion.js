
const motion = {

   s: (u, a, t) => (u * t) + (0.5 * a * t * t),
   v: (u, a, s) => Math.sqrt((u * u) + (2 * a * s))

}

export { motion }
