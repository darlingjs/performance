/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingutil) {
    'use strict';


    //Run tests
    var suite = new Benchmark.Suite();
    var poolOfObjects = new darlingutil.PoolOfObjects(Object),
        warmupPoolOfObjects = new darlingutil.PoolOfObjects(Object).warmup(1000);

    //random create and dispose objects
    suite.add('new', function() {
//        var createCount = 3 + 3 * Math.random();
//        var disposeCount = 3 + 3 * Math.random();
        var o1 = {x:1.0, y:2.0},
            o2 = {x:1.0, y:2.0},
            o3 = {x:1.0, y:2.0};

        o3.x = o2.y + o1.x;
        o1 = null;
        o2 = null;
        o3 = null;

        var o4 = {x:1.0, y:2.0},
            o5 = {x:1.0, y:2.0},
            o6 = {x:1.0, y:2.0};

        o6.x = o5.y + o4.x;
        o4 = null;
        o5 = null;
        o6 = null;
    })
    .add('pool of object', function() {
        var o1 = poolOfObjects.get(),
            o2 = poolOfObjects.get(),
            o3 = poolOfObjects.get();

        o1.x = 1.0;
        o1.y = 2.0;

        o2.x = 1.0;
        o2.y = 2.0;

        o3.x = 1.0;
        o3.y = 2.0;

        o3.x = o2.y + o1.x;
        o1.onDispose();
        o2.onDispose();
        o3.onDispose();

        var o4 = poolOfObjects.get(),
            o5 = poolOfObjects.get(),
            o6 = poolOfObjects.get();

        o4.x = 1.0;
        o4.y = 2.0;

        o5.x = 1.0;
        o5.y = 2.0;

        o6.x = 1.0;
        o6.y = 2.0;

        o6.x = o5.y + o4.x;
        o4.onDispose();
        o5.onDispose();
        o6.onDispose();
    })
    .add('warm up pool of objects', function() {
        var o1 = warmupPoolOfObjects.get(),
            o2 = warmupPoolOfObjects.get(),
            o3 = warmupPoolOfObjects.get();

            o1.x = 1.0;
            o1.y = 2.0;

            o2.x = 1.0;
            o2.y = 2.0;

            o3.x = 1.0;
            o3.y = 2.0;
            o3.x = o2.y + o1.x;

        o1.onDispose();
        o2.onDispose();
        o3.onDispose();

        var o4 = warmupPoolOfObjects.get(),
            o5 = warmupPoolOfObjects.get(),
            o6 = warmupPoolOfObjects.get();

        o4.x = 1.0;
        o4.y = 2.0;

        o5.x = 1.0;
        o5.y = 2.0;

        o6.x = 1.0;
        o6.y = 2.0;

        o6.x = o5.y + o4.x;

        o4.onDispose();
        o5.onDispose();
        o6.onDispose();
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

})(darlingutil);