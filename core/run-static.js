/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function() {
    'use strict';

    //Prepare env
    var COUNT = 1000;

    function worldBuilder(darlingjs, darlingutil, greatThen004) {
        var m = darlingjs.module('systemPerformance');

        m.$c('updatePerformance', {
            time: 0.0,
            count: 0.0
        });

        if (greatThen004) {
            m.$s('updatePerformance', {
                $require: ['updatePerformance'],

                $update: ['$entity', '$world', '$time', function($entity, $world, $time) {
                    $entity.updatePerformance.time = $entity.updatePerformance.time + $time;
                    $entity.updatePerformance.count++;
                }]
            });
        } else {
            m.$s('updatePerformance', {
                $require: ['updatePerformance'],

                $update: ['$node', '$world', '$time', function($node, $world, $time) {
                    $node.updatePerformance.time = $node.updatePerformance.time + $time;
                    $node.updatePerformance.count++;
                }]
            });
        }


        var world = darlingjs.world('performance-empty', ['systemPerformance']);
        world.$add('updatePerformance');

        var components = ['updatePerformance'];
        var i;
        if (greatThen004) {
            for(i = 0; i < COUNT; i++) {
                world.$e(components);
            }
        } else {
            for(i = 0; i < COUNT; i++) {
                world.$add(world.$e(components));
            }
        }

        return world;
    }

    function buildVanillaJSWorld() {
        var ListNode = function() {
            var node = {};
            node['next'] = null;
            node['entity'] = null;
            return node;
        };

        var head, tail;

        for(var i = 0; i < COUNT; i++) {
            //world.$add(world.$e(components));
            var node = new ListNode();
            node.entity = {
                time: 0.0,
                count: 0.0
            };
            if (!tail) {
                head = node;
            } else {
                tail.next = node;
            }
            tail = node;
        }

        return {
            $update: function ($time) {
                var node = head;
                while(node) {
                    node.entity.time += $time;
                    node.entity.count++;
                    node = node.next;
                }
            }
        };
    }

    function buildVanillaJSWorldPrototype() {
        var ListNode = function() {};
        ListNode.prototype.next = null;
        ListNode.prototype.entity = null;

        var head, tail;

        for(var i = 0; i < COUNT; i++) {
            //world.$add(world.$e(components));
            var node = new ListNode();
            node.entity = {
                time: 0.0,
                count: 0.0
            };
            if (!tail) {
                head = node;
            } else {
                tail.next = node;
            }
            tail = node;
        }

        return {
            $update: function ($time) {
                var node = head;
                while(node) {
                    node.entity.time += $time;
                    node.entity.count++;
                    node = node.next;
                }
            }
        };
    }

    var world_0_0_3 = worldBuilder(darlingjs_0_0_3, darlingutil_0_0_3, false),
        world_0_0_4 = worldBuilder(darlingjs_0_0_4, darlingutil_0_0_4, true),
        world_vanilla = buildVanillaJSWorld(),
        world_vanilla_prototype = buildVanillaJSWorldPrototype();

    //Run tests

    var suite = new Benchmark.Suite();
    suite.add('$update in ver 0.0.3 (call or apply)', function() {
        world_0_0_3.$update(0.1);
    })
    .add('$update in ver 0.0.4 (member method)', function() {
        world_0_0_4.$update(0.1);
    })
    .add('$update in vanilla world', function() {
        world_vanilla.$update(0.1);
    })
    .add('$update in vanilla prototype world', function() {
        world_vanilla_prototype.$update(0.1);
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

