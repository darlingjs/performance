/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(BenchScene) {
    'use strict';

    var world = BenchScene.world;

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
        print("Benchmark complete.\nms/frame: " + avg + " +/- " + stddev(times, avg));
    }

    function lazyBench() {
        var times = [];
        var iteration = 0;
        (function nextBench() {
            var begin = new Date().getTime();
            step();
            times[iteration] = new Date().getTime() - begin;
            print(iteration + " = " + times[iteration]);
            if (++iteration < FRAMES) {
                setTimeout(nextBench, 10);
            } else {
                var avg = mean(times);
                print("Benchmark complete.\nms/frame: " + avg + " +/- " + stddev(times, avg));
            }
        })();
    }

    var dt = 60 / 1000;
    function step() {
        world.$update(dt);
    }

    warmup();
//    bench();
    lazyBench();
})(BenchScene);