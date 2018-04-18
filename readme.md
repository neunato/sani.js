# sani.js

Siteswap animator in JavaScript for modern browsers (tested in Chrome, Firefox, Edge, Safari, Opera).

Supports (multiplex) asynchronous and synchronous juggling patterns.

[Check it out!](https://independentgeorge.github.io/sani.js/)


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
const animator = new Animator("canvasID");
animator.start("753");
```


#### Configuration

Use the second parameter of the constructor to set the initial configuration.

```javascript
const settings = {
   beatDuration: 300,
   dwell: 0.5,
   slowdown: 2
};
const animator = new Animator("canvasID", settings);
animator.start("(6x,4)*");
```

Or `.configure()` to do it after it's instantiated.

```javascript
const animator = new Animator("canvasID");
const settings = {
   beatDuration: 300,
   dwell: 0.5,
   slowdown: 2
};
animator.configure(settings);
animator.start("[54][65]1");
```

Type and value of a property of the configuration object must be allowed by the following table to overwrite what was previously set. Invalid inputs are silently ignored.

|Property        |Type            |Allowed values  |Default     |Description
| -------------- | -------------- | -------------- | ---------- | -------------------------------------------------------------------
|`beatDuration`  |*Number*        |positive float  |300         |Beat duration in miliseconds.<sup>1</sup>
|`slowdown`      |*Number*        |float           |1           |Number of real seconds per animator second.
|`dwell`         |*Number*        |float [0-1]     |0.5         |Hold time, expressed as ratio of full to empty hand.<sup>2</sup>
|`reversed`      |*Boolean*       |true, false     |false       |Inside or outside tosses.
|`ballColor`     |*String*        |[css color][1]  |"#ff3636"   |Color of balls.

<sup>1</sup> *Beat duration is doubled when juggling synchronously as jugglers tend to slow down in reality.*  
<sup>2</sup> *Dwell time ranges 0-2 beats in asynchronous, and 0-1 in synchronous juggling.*  


## To do

- Cache canvas arc paths and draw images.
- Start juggling in the middle of a siteswap (optionally?).
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