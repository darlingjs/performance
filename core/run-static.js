/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';

    var m = darlingjs.module('systemPerformance');
    var COUNT = 10000;

    m.$c('updatePerformance', {
        time: 0.0,
        count: 0.0
    });

    m.$s('updatePerformance', {
        $require: ['updatePerformance'],

        $update: ['$node', '$world', '$time', function($node, $world, $time) {
            $node.updatePerformance.time = $node.updatePerformance.time + $time;
            $node.updatePerformance.count++;
        }]
    });

    var world = darlingjs.world('performance-empty', ['systemPerformance', 'ngPerformance']);
    world.$add('ngPerformanceBefore');
    world.$add('updatePerformance');
    world.$add('ngPerformanceAfter');

    var components = ['updatePerformance'];
    for(var i = 0; i < COUNT; i++) {
        world.$add(world.$e(components));
    }

    world.$start();
}) (darlingjs);