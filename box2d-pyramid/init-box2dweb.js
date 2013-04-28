/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */

(function(darlingjs, window) {
    'use strict';

    var world = darlingjs.world('box2d-pyramid', [
        'ngFlatland',
        'ngPhysics',
        'ngBox2DWeb'
    ]);

    var API = window.BenchScene = window.BenchScene || {};
    API.world = world;

})(darlingjs, window);