
function clear(context) {

   context.save()
   context.setTransform(1, 0, 0, 1, 0, 0)
   context.clearRect(0, 0, context.canvas.width, context.canvas.height)
   context.restore()

}

export { clear }
