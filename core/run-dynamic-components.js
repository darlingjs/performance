/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function() {
    'use strict';


    function worldBuilder(darlingjs, darlingutil) {
        var m = darlingjs.module('systemPerformance');
        var COUNT = 512;

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

        var world = darlingjs.world('performance-empty', ['systemPerformance']);
        var system1 = world.$add('system1');
        var system2 = world.$add('system2');

        var components = ['system1'];
        for(var i = 0; i < COUNT; i++) {
            world.$add(world.$e(components));
        }

        return world;
    }

    var world_0_0_3 = worldBuilder(darlingjs_0_0_3, darlingutil_0_0_3),
        world_0_0_4 = worldBuilder(darlingjs_0_0_4, darlingutil_0_0_4),
        world_0_0_4_nullity = worldBuilder(darlingjs_0_0_4_nullity, darlingutil_0_0_4_nullity);


    //Run tests

    var suite = new Benchmark.Suite();

    suite.add('$update in ver 0.0.3 (call or apply)', function() {
        world_0_0_3.$update(0.1);
    })
    .add('$update in ver 0.0.4 (member method)', function() {
        world_0_0_4.$update(0.1);
    })
    .add('$update in ver 0.0.4 (member method & nullity)', function() {
        world_0_0_4_nullity.$update(0.1);
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