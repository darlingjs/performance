/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function() {
    'use strict';

    //Prepare env

    var world_0_0_3,
        world_0_0_4;

    world_0_0_3 = (function(darlingjs, darlingutil) {

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

        var world = darlingjs.world('performance-empty', ['systemPerformance']);
        world.$add('updatePerformance');

        var components = ['updatePerformance'];
        for(var i = 0; i < COUNT; i++) {
            world.$add(world.$e(components));
        }

        return world;
    }) (darlingjs_0_0_3, darlingutil_0_0_3);

    world_0_0_4 = (function(darlingjs, darlingutil) {
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

        var world = darlingjs.world('performance-empty', ['systemPerformance']);
        world.$add('updatePerformance');

        var components = ['updatePerformance'];
        for(var i = 0; i < COUNT; i++) {
            world.$add(world.$e(components));
        }

        return  world;
    }) (darlingjs_0_0_4, darlingutil_0_0_4);

    //Run tests

    var suite = new Benchmark.Suite;
    suite.add('$update in ver 0.0.3 (call or apply)', function() {
        world_0_0_3.$update(0.1);
    })
    .add('$update in ver 0.0.4 (member method)', function() {
        world_0_0_4.$update(0.1);
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

