/**
 * Created by lmarkus on 12/25/14.
 */
'use strict';
define(function (require) {

    require('animationPolyfill');


    var Shape = require('shape'),
        canvas = null,
        ctx = null,
        theShape = null,
    //Some config
        baseShapeConfig = {
            numberOfNodes: 2,
            singleColorSpeed: 5,
            nodeConfig: {}
        },
        runTime = 20000, //ms
        runPause = 5000, //ms
        slowStop = null,
        slowReset = null,
    //Some instrumentation for performance
        frameId = null,
        fpsId = null,
        lastCall = (new Date()).getTime(),
        duration = 0,
        frames = 0;


    /**
     * Some initial config of the drawing surface.
     */
    function
    setup() {

        canvas = document.getElementById('field');
        canvas.width = 4 * window.innerWidth;
        canvas.height = 4 * window.innerHeight;
        baseShapeConfig.nodeConfig.bounds = {
            x: {min: 0, max: canvas.width},
            y: {min: 0, max: canvas.height}
        };

        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        canvas.addEventListener('click', init);

    }

    /**
     * Reset the canvas and draw;
     */
    function init() {

        //Clear any previous timers
        destroy();

        //Clear canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Create new shape
        theShape = new Shape(ctx, baseShapeConfig);

        //Start drawing loop
        draw();

        //Make sure it dies in after a while
        slowStop = setTimeout(slowDestroy, runTime);

        //Instrument fps;
        fpsId = setInterval(function () {
            console.log((frames / duration), 'fps');
        }, 1000);

    }

    /**
     * Stop the animation. (And reset the instrumentation)
     */
    function destroy() {
        window.cancelAnimationFrame(frameId);
        clearInterval(slowStop);
        clearInterval(slowReset);
        clearInterval(fpsId);
        fpsId = frameId = null;
        duration = frames = 0;

    }

    /**
     * Stop the animation, let the rendering remain for a bit berfore starting again
     */
    function slowDestroy() {
        destroy();
        slowReset = setTimeout(init, runPause);
    }

    /**
     * FPS calculator
     */
    function sampleFPS() {
        var after = (new Date()).getTime();
        frames++;
        duration += (after - lastCall) / 1000;
        lastCall = after;
    }


    /**
     * Drawing loop.
     */
    function draw() {
        frameId = window.requestAnimationFrame(draw);
        theShape.draw();
        theShape.step();
        sampleFPS();
    }


    setup();
    init();
});