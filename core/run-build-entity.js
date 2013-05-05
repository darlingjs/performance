/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs) {
    'use strict';

    var world;

    world = darlingjs.w('theWorld');
    world.$c('theComponent0', {});
    world.$c('theComponent1', {});
    world.$c('theComponent2', {});

    var config = {
        theComponent0: {
            x: 1,
            y: 1.2
        },
        theComponent1: true,
        theComponent2: true
    };

    setTimeout(function() {
        console.log('start test');

        new Benchmark.Suite().add('short config', function() {
            var e = world.$e({
                theComponent0: {
                    x: 1,
                    y: 1.2
                },
                theComponent1: true,
                theComponent2: true
            });
            world.$remove(e);
        })
        .add('quotes config', function() {
            var e = world.$e({
                'theComponent0': {
                    x: 1,
                    y: 1.2
                },
                'theComponent1': true,
                'theComponent2': true
            });
            world.$remove(e);
        })
        .add('stored config', function() {
            var e = world.$e(config);
            world.$remove(e);
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