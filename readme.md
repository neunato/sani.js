# sani.js

Canvas based siteswap animator in JavaScript for modern browsers.

Supports (multiplex) asynchronous and synchronous juggling patterns.


[Check it out!](https://independentgeorge.github.io/sani.js/)

## Usage


Include the script
```html
<script src="dist/sani.min.js"></script>
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
   fpb: 20,
   dwell: 0.5,
   slowdown: 1
};
const animator = new Animator("canvasID", settings);
animator.start("(6x,4)*");
```

Or `.configure()` to do it after it's instantiated.

```javascript
const animator = new Animator("canvasID");
const settings = {
   fpb: 20,
   dwell: 0.5,
   slowdown: 1
};
animator.configure(settings);
animator.start("[54][65]1");
```

Type and value of a property of the configuration object must be allowed by the following table to overwrite what was previously set. Invalid inputs are silently ignored.

|Property        |Type            |Allowed values  |Default     |Description
| -------------- | -------------- | -------------- | ---------- | -------------------------------------------------------------------
|`fpb`           |*Number*        |positive integer|20          |Beat duration in frames, where one frame lasts ~16.7 ms.<sup>1</sup>
|`slowdown`      |*Number*        |positive float  |2           |Number of real seconds per animator second.
|`dwell`         |*Number*        |float [0-1], multiple of `dwellStep`    |0.5         |Hold time, expressed as ratio of full to empty hand.<sup>2</sup>
|`dwellStep`     |*Number*        |positive float  |0.25        |Amount of dwell time between two catches of "twin multiplexes".<sup>3</sup>
|`reversed`      |*Boolean*       |true, false     |false       |Inside or outside tosses.
|`ballColor`     |*String*        |[css color][1]  |"#ff3636"   |Color of balls.

<sup>1</sup> *Beat duration is doubled when juggling synchronously as jugglers tend to slow down in reality.*  
<sup>2</sup> *Dwell time ranges 0-2 beats in asynchronous, and 0-1 in synchronous juggling.*  
<sup>3</sup> *In such multiplex groups, like `[55]`, one ball will be caught `dwellStep` of a beat later (or earlier, depending on `dwell`). The number of such multiplex tosses is limited to `(1 / dwellStep) - 1`.*


The number of frames in every animation has to be an integer. The following demands must be satisfied for the configuration to work:

```javascript
// Number of frames in any throw + catch animation pair.
Number.isInteger( fpb * slowdown )

// Number of frames in a catch animation.
Number.isInteger( fpb * slowdown * dwell )

// Number of frames two animations of twin multiplex tosses will differ in.
Number.isInteger( fpb * slowdown * dwellStep )
```


## To do


High priority

- Test browser support and add polyfills.
- Time based animation (if 120Hz+ monitors really are a thing).
- Cache canvas arc paths and draw images. I've noticed some lag with large balls in Firefox.

Low priority

- Allow for animations of non integer frame counts (but still prefer them).
- Start juggling in the middle of a siteswap (optionally?).
- Create and hook up a space time diagram.
- Bundle settings in presets.
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