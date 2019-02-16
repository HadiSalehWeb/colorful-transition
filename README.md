# colorful-transition
A colorful transition animation for HTML5 canvas

![A colorful nightmare.][ct]

## Usage:
After downloading colorful-transition.js and including it in you HTML, use it like this:

```javascript
transition(ctx, options);
```

### ctx
A reference to the CanvasRenderingContext2D you want to perform the transition on.
### options
A collection of options that define the transition:
- `x: number`: the starting x position of the area where the transition will take place. Defaults to 0.
- `y: number`: the starting y position of the area where the transition will take place. Defaults to 0.
- `width: number`: the width of the area where the transition will take place. Defaults to ctx.canvas.width.
- `height: number`: the height of the area where the transition will take place. Ddefaults to ctx.canvas.height.
- `count: number`: the number strips used in the transition. Defaults to 10

for example for `count: 2`:

![2 rect transition][2ct]

for `count: 200`:

![200 rect transition][200ct]

- `duration: number`: The duration of the transition in milliseconds. Defaults to 1000.
- `steepness: number`: The steepness of the easing curve. See https://www.desmos.com/calculator/sheh8hflly, play around with the variable `k` and see how it changes the curve. The recommanded minimum is 17, as steepness below 17 results in sudden jumps at the start and end of the animation. Defaults to 17.
- `direction: boolean`: A string that defines the direction of the transition. Only these values are possible:

    `vp`: Vertical positive

![Vertical positive][vp]

    `vn`: Vertical negative

![Vertical negative][vn]

    `vm`: Vertical mixed

![Vertical mixed][vm]

    `hp`: Horizontal positive

![Horizontal positive][hp]

    `hn`: Horizontal negative

![Horizontal negative][hn]

    `hm`: Horizontal mixed
    
![Horizontal mixed][hm]

- `color: string`: the color of the transition. Defaults to '#000'
- `onfinished: function(ctx, totalTime)`: invoked after the animation finishes executing.
- `onframe: function(ctx, totalTime)`: invoked every frame of the animation.



[ct]: https://raw.githubusercontent.com/HSaleh852/Images/master/ct.gif
[2ct]: https://raw.githubusercontent.com/HSaleh852/Images/master/2ct.gif
[200ct]: https://raw.githubusercontent.com/HSaleh852/Images/master/200ct.gif
[vp]: https://raw.githubusercontent.com/HSaleh852/Images/master/vp.gif
[vn]: https://raw.githubusercontent.com/HSaleh852/Images/master/vn.gif
[vm]: https://raw.githubusercontent.com/HSaleh852/Images/master/vm.gif
[hp]: https://raw.githubusercontent.com/HSaleh852/Images/master/hp.gif
[hn]: https://raw.githubusercontent.com/HSaleh852/Images/master/hn.gif
[hm]: https://raw.githubusercontent.com/HSaleh852/Images/master/hm.gif