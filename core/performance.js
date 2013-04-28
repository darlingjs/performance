/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';

    var m = darlingjs.m('ngPerformance');

    var timeBefore;
    var iteration = 0;
    var EXPERIMENT_COUNT = 1000;
    var experiments = new Array(EXPERIMENT_COUNT);

    m.$s('ngPerformanceBefore', {
        $update: ['$time', function($time) {
            timeBefore = Date.now();
        }]
    });

    m.$s('ngPerformanceAfter', {
        $update: ['$time', function($time) {
            var deltaTime = Date.now() - timeBefore;
            if (iteration < EXPERIMENT_COUNT) {
                experiments[iteration] = deltaTime;
                if (++iteration === EXPERIMENT_COUNT) {
                    calcStatProperites(experiments);
                }
            }
        }]
    });

    function calcStatProperites(values) {
        var meanValue = mean(values);
        var stddevValue = stddev(values, meanValue);
        console.log('stats : mean ' + meanValue + '\nstddev:' + stddevValue);
    }

    function mean(values) {
        var total = 0;
        var count = values.length;
        for (var i = 0; i < count; ++i) {
            total += values[i];
        }
        return total / count;
    }

    function stddev(values, mean) {
        var variance = 0;
        var count = values.length;
        for (var i = 0; i < count; ++i) {
            var diff = values[i] - mean;
            variance += diff * diff;
        }
        return Math.sqrt(variance / (count - 1));
    }
})(darlingjs);