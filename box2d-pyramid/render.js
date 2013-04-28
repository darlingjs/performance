/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(BenchScene) {
    'use strict';
    var world = BenchScene.world;

    //add render
    var width = 640,
        height = 480;

    world.$add('ng2DViewPort', {
        lookAt: {
            x: 0, y: 0
        },
        width: width,
        height: height
    });

    world.$add('ngBox2DDebugDraw', {
        domID: 'debugView', width: width, height: height
    });

    var WARMUP = 64;
    var FRAMES = 256;

    function warmup() {
        for (var i = 0; i < WARMUP; ++i) {
            step();
        }
    }

    function mean(values) {
        var total = 0;
        for (var i = 0; i < FRAMES; ++i) {
            total += values[i];
        }
        return total / FRAMES;
    }

    function stddev(values, mean) {
        var variance = 0;
        for (var i = 0; i < values.length; ++i) {
            var diff = values[i] - mean;
            variance += diff * diff;
        }
        return Math.sqrt(variance / FRAMES);
    }

    function bench() {
        var times = [];
        for (var i = 0; i < FRAMES; ++i) {
            var begin = new Date().getTime();
            step();
            times[i] = new Date().getTime() - begin;
        }

        var avg = mean(times);
        //print("Benchmark complete.\nms/frame: " + avg + " +/- " + stddev(times, avg));
    }

    var dt = 60 / 1000;
    function step() {
        world.$update(dt);
    }

    world.$start();

//    warmup();
//    bench();
})(BenchScene);