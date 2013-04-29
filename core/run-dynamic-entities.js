/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';

    var m = darlingjs.module('systemPerformance');
    var COUNT = 20;
    var MAX_COUNT = 200;

    m.$c('theComponent');

    var components = ['theComponent'];

    m.$s('theSystem', {
        $require: ['theComponent'],

        enabled: true,

        $beforeUpdate: ['$world', '$time', '$nodes', function($world, $time, $nodes) {
            if ($nodes.length() <= 0) {
                this.increase = true;
                this.decrease = false;
            } else if ($nodes.length() >= MAX_COUNT) {
                this.increase = false;
                this.decrease = true;
            }

            if(this.increase) {
                for(var i = 0; i < COUNT; i++) {
                    world.$add(world.$e(components));
                }
            }

            if(this.decrease) {
                if (this.enabled) {
                    this.targetIndex = Math.floor($nodes.length() * Math.random());
                }
            }
        }],

        $update: ['$node', '$world', function($node, $world) {
            if(this.decrease && --this.targetIndex === -1) {
                $world.$remove($node);
            }
        }]
    });


    var world = darlingjs.world('performance-empty', ['systemPerformance', 'ngPerformance']);
    world.$add('ngPerformanceBefore');
    var system1 = world.$add('theSystem');
    world.$add('ngPerformanceAfter');

    world.$start();

})(darlingjs);