/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';
    //Run tests
    var COUNT = 100,
        COMPONENT_COUNT = 5;
    var m = darlingjs.m('theModule');

    for(var i = 0; i < COMPONENT_COUNT + 1; i++) {
        m.$c('theComponent' + i, {
            count: 0
        });
    }

    m.$s('theSystem0', {
        $require: ['theComponent0'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent0.count;

            $entity.$add('theComponent' + Math.floor(1 + COMPONENT_COUNT * Math.random()));
            $entity.$remove('theComponent' + Math.floor(1 + COMPONENT_COUNT * Math.random()));
        }]
    });

    m.$s('theSystem1', {
        $require: ['theComponent1'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent1.count;
        }]
    });

    m.$s('theSystem2', {
        $require: ['theComponent2'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent2.count;
        }]
    });

    m.$s('theSystem3', {
        $require: ['theComponent3'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent3.count;
        }]
    });

    m.$s('theSystem4', {
        $require: ['theComponent4'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent4.count;
        }]
    });

    m.$s('theSystem5', {
        $require: ['theComponent5'],

        $update: ['$entity', function($entity) {
            ++$entity.theComponent5.count;
        }]
    });

    function buildWorld(name, warmUp, count) {
        var world = darlingjs.world(name, ['theModule']);
        world.$add('theSystem0');
        world.$add('theSystem1');
        world.$add('theSystem2');
        world.$add('theSystem3');
        world.$add('theSystem4');
        world.$add('theSystem5');

        for (var i = 0; i < count; i++) {
            if (warmUp) {
                world.$e({
                    theComponent0: true,
                    theComponent1: false,
                    theComponent2: false,
                    theComponent3: false,
                    theComponent4: false,
                    theComponent5: false
                });
            } else {
                world.$e({
                    theComponent0: true
                });
            }
        }
        return world;
    }

    var worldWarnUpEntity = buildWorld('worldWarnUpEntity', true, COUNT),
        worldBaseEntity = buildWorld('worldBaseEntity', false, COUNT);

    setTimeout(function() {
        console.log('start test');

        new Benchmark.Suite().add('warm-up entity', function() {
            worldWarnUpEntity.$update(0.1);
        })
        .add('base entity', function() {
            worldBaseEntity.$update(0.1);
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
    }, 1000);
})(darlingjs);