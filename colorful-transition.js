const range = n => Array(n).fill(0).map((_, i) => i);
const removeAt = arr => i => arr.slice(0, i).concat(arr.slice(i + 1));
const scramble = arr => {
    if (arr.length === 0) return [];
    const i = Math.floor(Math.random() * arr.length);
    return scramble(removeAt(arr)(i)).concat(arr[i]);
}

const Strip = function (x, y, width0, width1, height0, height1, progressionFunction) {
    this.x = x;
    this.y = y;
    this.width = width0;
    this.height = height0;

    this.setProgression = function (prog) {
        this.width = width0 + progressionFunction(prog) * (width1 - width0);
        this.height = height0 + progressionFunction(prog) * (height1 - height0);
        return this;
    };

    this.draw = function (ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        return this;
    };
}

//https://www.desmos.com/calculator/sheh8hflly
const getProgressionFunction = (k, len, r) => x => 1 / (1 + Math.exp(-k * (x - .5 * (.5 + ((r + 1) / (len + 1))))));

const directions = {
    vp: { vertical: true, orientation: 1 },
    vn: { vertical: true, orientation: -1 },
    vm: { vertical: true, orientation: 0 },
    hp: { vertical: false, orientation: 1 },
    hn: { vertical: false, orientation: -1 },
    hm: { vertical: false, orientation: 0 }
}

const validateInput = function (options) {
    if (!wholePositive(options.x))
        throw 'x must be a whole positive number.';
    if (!wholePositive(options.y))
        throw 'y must be a whole positive number.';
    if (!wholePositive(options.width))
        throw 'width must be a whole positive number.';
    if (!wholePositive(options.height))
        throw 'height must be a whole positive number.';
    if (!wholePositive(options.count))
        throw 'count must be a whole positive number.';
    if (!wholePositive(options.duration))
        throw 'duration must be a whole positive number.';
    if (typeof options.steepness !== 'number')
        throw 'steepness must be number.';
    if (!directions.hasOwnProperty(options.direction))
        throw 'direction can only have one of the following values: [vp, vn, vm, hp, hn, hm].';
    if (typeof options.onfinished !== 'function')
        throw 'onfinished must be a function.';
    if (typeof options.onframe !== 'function')
        throw 'onframe must be a function.';
}

const wholePositive = x => typeof x === 'number' && x >= 0 && x % 1 === 0;

const transition = function (ctx, options) {
    options = Object.assign({
        x: 0,
        y: 0,
        width: ctx.canvas.width,
        height: ctx.canvas.height,
        count: 10,
        duration: 1000,
        steepness: 17,
        direction: 'vp',
        color: '#000',
        onfinished: () => { },
        onframe: () => { }
    }, options || {});
    validateInput(options);
    Object.assign(this, options);

    direction = directions[direction];

    const stripLength = direction.vertical ? width / count : height / count;
    const strips = scramble(range(count)).map((r, i) => new Strip(
        direction.vertical ? x + i * stripLength :
            direction.orientation === 1 ? x :
                direction.orientation === -1 ? x + width :
                    x + width * (i % 2),
        !direction.vertical ? y + i * stripLength :
            direction.orientation === 1 ? y :
                direction.orientation === -1 ? y + height :
                    y + height * (i % 2),
        direction.vertical ? stripLength : 0,
        direction.vertical ? stripLength :
            direction.orientation === 1 ? width :
                direction.orientation === -1 ? -width :
                    width * (i % 2 === 0 ? 1 : -1),
        !direction.vertical ? stripLength : 0,
        !direction.vertical ? stripLength :
            direction.orientation === 1 ? height :
                direction.orientation === -1 ? -height :
                    height * (i % 2 === 0 ? 1 : -1),
        getProgressionFunction(steepness, count, r)
    ));

    let start = null, progression = 0;

    let step = function (timestamp) {
        if (!start) start = timestamp;
        if (timestamp - start >= duration) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            onfinished(ctx, timestamp - start);
            return;
        }

        progression = (timestamp - start) / duration;

        for (let i = 0, len = strips.length; i < len; i++)
            strips[i].setProgression(progression).draw(ctx, color);

        onframe(ctx, timestamp - start);
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// exports = transition;
export default transition;