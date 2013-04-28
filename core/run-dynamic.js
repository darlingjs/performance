/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';

    var m = darlingjs.module('systemPerformance');
    var COUNT = 100;

    m.$c('system1');
    m.$c('system2');

    m.$s('system1', {
        $require: ['system1'],

        enabled: true,

        $beforeUpdate: ['$world', '$time', '$nodes', function($world, $time, $nodes) {
            if ($nodes.length() <= 0) {
                system1.enabled = false;
                system2.enabled = true;
            } else {
                if (this.enabled) {
                    this.targetIndex = Math.floor($nodes.length() * Math.random());
                }
            }
        }],

        $update: ['$node', function($node) {
            if(this.enabled && --this.targetIndex === -1) {
                $node.$remove('system1');
                $node.$add('system2');
            }
        }]
    });

    m.$s('system2', {
        $require: ['system2'],

        enabled: false,

        $beforeUpdate: ['$world', '$time', '$nodes', function($world, $time, $nodes) {
            if ($nodes.length() <= 0) {
                system1.enabled = true;
                system2.enabled = false;
            } else {
                if (this.enabled) {
                    this.targetIndex = Math.floor($nodes.length() * Math.random());
                }
            }
        }],

        $update: ['$node', function($node) {
            if(this.enabled && --this.targetIndex === -1) {
                $node.$remove('system2');
                $node.$add('system1');
            }
        }]
    });

    var world = darlingjs.world('performance-empty', ['systemPerformance', 'ngPerformance']);
    world.$add('ngPerformanceBefore');
    var system1 = world.$add('system1');
    var system2 = world.$add('system2');
    world.$add('ngPerformanceAfter');

    var components = ['system1'];
    for(var i = 0; i < COUNT; i++) {
        world.$add(world.$e(components));
    }

    world.$start();

})(darlingjs);