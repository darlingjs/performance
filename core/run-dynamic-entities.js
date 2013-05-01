/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function() {
    'use strict';

    function worldBuilder(darlingjs) {

        var m = darlingjs.module('systemPerformance');
        var COUNT = 10;
        var MAX_COUNT = 20;

        m.$c('theComponent');

        var components = ['theComponent'];

        m.$s('theSystem', {
            $require: ['theComponent'],

            increase: true,
            decrease: false,
            enabled: true,

            $beforeUpdate: ['$world', '$nodes', function($world, $nodes) {
                if ($nodes.length() <= 0) {
                    this.increase = true;
                    this.decrease = false;
                } else if ($nodes.length() >= MAX_COUNT) {
                    this.increase = false;
                    this.decrease = true;
                }

                if(this.increase) {
                    for(var i = 0; i < COUNT; i++) {
                        $world.$add($world.$e(components));
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


        var world = darlingjs.world('performance-empty', ['systemPerformance']);
        world.$add('theSystem');
        return world;
    };

    var world_0_0_3 = worldBuilder(darlingjs_0_0_3),
        world_0_0_4 = worldBuilder(darlingjs_0_0_4),
        world_0_0_4_local = worldBuilder(darlingjs_0_0_4_local);

    //Run tests

    var suite = new Benchmark.Suite();

    suite.add('$update in ver 0.0.3 (call or apply)', function() {
        world_0_0_3.$update(0.1);
    })
    .add('$update in ver 0.0.4 (member method)', function() {
        world_0_0_4.$update(0.1);
    })
    .add('$update in ver 0.0.4 (local version)', function() {
        world_0_0_4_local.$update(0.1);
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': true });
})();

