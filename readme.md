# sani.js

Siteswap animator in JavaScript for modern browsers (tested in Chrome, Firefox, Edge, Safari, Opera).

Supports (multiplex) asynchronous and synchronous juggling patterns.


## Usage


Include the script
```html
<script src="dist/sani.js"></script>
```

Create a canvas
```html
<canvas id="canvasID" style="width: 250px; height: 800px"></canvas>
```

Create an animator and start juggling!
```javascript
const animator = new Animator("canvasID", {
   beatDuration: 200,
   dwell: 0.4,
   slowdown: 2
})
animator.play("753")
```

## API

### `Animator(canvas, settings = {})`

Create an animator instance given a `canvas` (id or element) and a `settings` object forwareded to [`Animator.prototype.configure`](#animator-prototype-configure-settings-).

### `Animator.prototype.play(siteswap = null)`

Start playing new `siteswap` (string passed to or an instance of [`Siteswap`](https://github.com/independentgeorge/siteswap.js)) or unpause if no siteswap supplied.

### `Animator.prototype.pause()`

Pause the animation.

### `Animator.prototype.stop()`

Stop the animation.

### `Animator.prototype.seek(percent, continuous = false)`

Go to a certain `percent` of the animation (100% being one coloured cycle) relative to the beginning of  second cycle if `continuous` is true (all balls in screen), or first otherwise (balls appear as their turn comes).

### `Animator.prototype.configure(settings)`

Type and value of a property of the configuration object must be allowed by the following table to overwrite what was previously set.

|Property        |Type            |Allowed values  |Default     |Description
| -------------- | -------------- | -------------- | ---------- | -------------------------------------------------------------------
|`beatDuration`  |*Number*        |positive float  |300         |Beat duration in miliseconds.<sup>1</sup>
|`slowdown`      |*Number*        |float           |1           |Number of real seconds per animator second.
|`dwell`         |*Number*        |float [0-1]     |0.5         |Hold time, expressed as ratio of full to empty hand.<sup>2</sup>
|`reversed`      |*Boolean*       |true, false     |false       |Inside or outside tosses.
|`continuous`    |*Boolean*       |true, false     |true        |Begin the animation with balls on screen.
|`ballColor`     |*String*        |[css color][1]  |"#ff3636"   |Color of balls.

<sup>1</sup> *Beat duration is doubled when juggling synchronously as jugglers tend to slow down in reality.*  
<sup>2</sup> *Dwell time ranges 0-2 beats in asynchronous, and 0-1 in synchronous juggling.*  


## To do

- Cache canvas arc paths and draw images.
- Create and hook up a space time diagram.
- GIF exporting.
- Throw value labels.
- Make `2`s held (custom animation which includes catch and throw?).
- Make holding more than one ball apparent (multiplex positions)?
- Polish catch paths.
- Polish multiplex `1`s and `2`s.

Ideas

- Continuous mode (juggling never stops).
- 3D space for passing patterns.
- Custom hand placement.
- Dynamic hand placement (think Mills' mess).
- Draw hands, if not the entire body.
- Interaction with balls (showing stats, styling...).
- Ball effects/skins.
- Custom props, like clubs (as a skin?).

And so much more...


## License

MIT License



[1]: https://developer.mozilla.org/en/docs/Web/CSS/color_value