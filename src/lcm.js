
function lcm(a, b) {

   const greater = Math.max(a, b)
   const smaller = Math.min(a, b)
   let result = greater
   while (result % smaller !== 0)
      result += greater
   return result

}

export { lcm }
