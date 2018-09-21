
// With a little help from http://www.lce.hut.fi/teaching/S-114.1100/lect_6.pdf :)

class Polynomial {

   constructor(coefficients) {

      this.coefficients = coefficients

   }

   at(x) {

      return this.coefficients.reduce((result, current) => current + (x * result))

   }

   differentiate() {

      return new Polynomial(this.coefficients.slice(0, -1).map((c, i, { length }) => (length - i) * c))

   }

}


class Spline {

   constructor(points, endpoint1 = 0, endpoint2 = 0) {

      this.polynomials = []
      this.xs = points.map(({ x }) => x)
      this.ys = points.map(({ y }) => y)
      const n = this.xs.length

      const hs = []
      const qs = []
      const us = []
      const vs = []
      const zs = []

      for (let i = 0; i < n - 1; i++) {
         hs[i] = this.xs[i + 1] - this.xs[i]
         qs[i] = (this.ys[i + 1] - this.ys[i]) / hs[i]
      }

      us[0] = 2 * (hs[0] + hs[1])
      vs[0] = 6 * (qs[1] - qs[0])
      for (let i = 1; i < n - 1; i++) {
         us[i] = (2 * (hs[i] + hs[i - 1])) - (hs[i - 1] * hs[i - 1] / us[i - 1])
         vs[i] = (6 * (qs[i] - qs[i - 1])) - (hs[i - 1] * vs[i - 1] / us[i - 1])
      }

      zs[0] = endpoint1
      zs[n - 1] = endpoint2
      for (let i = n - 2; i > 0; i--)
         zs[i] = (vs[i] - (hs[i] * zs[i + 1])) / us[i]



      for (let i = 0; i < n - 1; i++) {
         const d = this.ys[i]
         const c = -(hs[i] * zs[i + 1] / 6) - (hs[i] * zs[i] / 3) + ((this.ys[i + 1] - this.ys[i]) / hs[i])
         const b = zs[i] / 2
         const a = (zs[i + 1] - zs[i]) / (6 * hs[i])

         this.polynomials.push(new Polynomial([a, b, c, d]))
      }

   }

   at(x) {

      const { xs } = this
      const n = this.polynomials.length

      const min = Math.min(xs[0], xs[n])
      const max = Math.max(xs[0], xs[n])
      if (x < min || x > max)
         throw new Error("Out of bounds.")

      let i = 0

      // Points going left to right.
      if (xs[0] < xs[n]) {
         while (i < n && x > xs[i + 1])
            i++
      }

      // Or right to left.
      else {
         while (i < n && x < xs[i + 1])
            i++
      }

      return this.polynomials[i].at(x - xs[i])

   }

   maximum() {

      const maximum = {
         x: null,
         y: null
      }

      const { xs } = this

      for (let i = 0; i < this.polynomials.length; i++) {

         const der = this.polynomials[i].differentiate()

         const [a, b, c] = der.coefficients

         // Then we find `x`s for which `f(x) = 0`.
         const delta = Math.sqrt((b * b) - (4 * a * c))
         const x1 = ((-b + delta) / (2 * a)) + xs[i]
         const x2 = ((-b - delta) / (2 * a)) + xs[i]

         // Then we check if they are parts of visible intervals.
         const min = Math.min(xs[i], xs[i + 1])
         const max = Math.max(xs[i], xs[i + 1])

         if (x1 >= min && x1 <= max) {
            const y = this.at(x1)
            if (y > maximum.y) {
               maximum.x = x1
               maximum.y = y
            }
         }

         if (x2 >= min && x2 <= max) {
            const y = this.at(x2)
            if (y > maximum.y) {
               maximum.x = x2
               maximum.y = y
            }
         }

      }

      return maximum

   }

}


export { Spline }
