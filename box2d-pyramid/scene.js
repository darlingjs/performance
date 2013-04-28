/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs, BenchScene) {
    'use strict';

    var world = BenchScene.world;

    //Init systems

    world.$add('ngBox2DSystem', {
        gravity: {
            x: 0,
            y: -10
        },
        scale: 1,
        velocityIterations: 3,
        positionIterations: 3
    });

    //build ground

    world.$add(world.$e('ground', {
        ng2D: {
            x : 0.0,
            y: -10.0
        },
        ng2DSize: {
            width: 160.0,
            height: 20.0
        },
        ngPhysic: {
            type: 'static',
            //restitution: 0.0,
            density: 0.0,
            friction: 0.2,
            restitution: 0.0
        }
    }));

    //build pyramid

    var PYRAMID_SIZE = 40,
        BOX_SIZE = 1;

    var x = -7.0,
        y = 0.75;


    for (var i = 0; i < PYRAMID_SIZE; ++i) {

        var localX = x,
            localY = y;

        for (var j = i; j < PYRAMID_SIZE; ++j) {
            world.$add(world.$e('box', {
                ng2D: {
                    x: localX,
                    y: localY
                },
                ng2DSize: {
                    width: BOX_SIZE,
                    height: BOX_SIZE
                },
                ng2DRotation: {
                    rotation: 0.0
                },
                ngPhysic: {
                    type: 'dynamic',
//                    type: 'static',
                    friction: 0.2,
                    restitution: 0.0,
                    density: 0.5
                }
            }));
            localX += 0.125 + BOX_SIZE;
        }

        x += 0.0625 + 0.5 * BOX_SIZE;
        y += 0.0 + BOX_SIZE;
    }
})(darlingjs, BenchScene);