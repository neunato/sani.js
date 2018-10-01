
const _settings = Symbol.for("settings")


function configure(options) {

   const settings = this[_settings]

   if (options.beatDuration !== undefined)
      settings.beatDuration = options.beatDuration

   if (options.slowdown !== undefined)
      settings.slowdown = options.slowdown

   if (options.dwell !== undefined)
      settings.dwell = options.dwell

   if (options.ballColor !== undefined)
      settings.ballColor = options.ballColor

   if (options.reversed !== undefined)
      settings.reversed = options.reversed

   if (options.continuous !== undefined)
      settings.continuous = options.continuous

   const { beatDuration, dwell, slowdown, ballColor, reversed, continuous } = settings

   if (typeof beatDuration !== "number")
      throw new Error("Invalid configuration (`beatDuration` must be a number).")
   if (beatDuration <= 0)
      throw new Error("Invalid configuration (`beatDuration` must be positive).")

   if (typeof slowdown !== "number")
      throw new Error("Invalid configuration (`slowdown` must be a number).")
   if (slowdown <= 0)
      throw new Error("Invalid configuration (`slowdown` must be positive).")

   if (typeof dwell !== "number")
      throw new Error("Invalid configuration (`dwell` must be a number).")
   if (dwell < 0 || dwell > 1)
      throw new Error("Invalid configuration (`dwell` must be in [0-1] range).")

   if (typeof ballColor !== "string")
      throw new Error("Invalid configuration (`ballColor` must be a string).")
   if (!/^#[0-9a-f]{3}(?:[0-9a-f]{3})?/i.test(ballColor))
      throw new Error("Invalid configuration (`ballColor` must be a valid css color).")

   if (typeof reversed !== "boolean")
      throw new Error("Invalid configuration (`reversed` must be a boolean).")

   if (typeof continuous !== "boolean")
      throw new Error("Invalid configuration (`continuous` must be a boolean).")

}

export { configure }
