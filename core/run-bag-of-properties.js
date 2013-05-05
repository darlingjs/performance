/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */
(function() {
    'use strict';

    //Run tests
    var ENTITY_COUNT = 1000,
        COMPONENTS_COUNT = 10;

    function buildEntity() {
        return {
            $name: 'entity'
        };
    }

    function buildEntities(entityCount, componentCount, value) {
        var result = [];
        while(--entityCount>=0) {
            var entity = buildEntity();
            for(var i = 0; i < componentCount; i++) {
                buildComponent(entity, i, value);
                if (getComponent(entity, i)) {
                    getComponent(entity, i).count = 0;
                }
            }
            result.push(entity);
        }

        return result;
    }

    var emptyEntites = buildEntities(ENTITY_COUNT, 0),
        preparedByObjectEntities = buildEntities(ENTITY_COUNT, COMPONENTS_COUNT, {}),
        preparedByNullEntities = buildEntities(ENTITY_COUNT, COMPONENTS_COUNT, null);

    function getRandomComponentOfRandomEntityAndIncreaseOfCount(entites) {
        var entity = entites[Math.floor(ENTITY_COUNT * Math.random())];
        var componentIndex = Math.floor(COMPONENTS_COUNT * Math.random());
        if(!getComponent(entity, componentIndex)) {
            buildComponent(entity, componentIndex, {});
            getComponent(entity, componentIndex).count = 0;
        }

        getComponent(entity, componentIndex).count++;
    }

    function getComponent(entity, componentIndex) {
        switch(componentIndex) {
            case 0:
                return entity.ngComponent0;
            case 1:
                return entity.ngComponent1;
            case 2:
                return entity.ngComponent2;
            case 3:
                return entity.ngComponent3;
            case 4:
                return entity.ngComponent4;
            case 5:
                return entity.ngComponent5;
            case 6:
                return entity.ngComponent6;
            case 7:
                return entity.ngComponent7;
            case 8:
                return entity.ngComponent8;
            case 9:
                return entity.ngComponent9;
        }
    }

    function buildComponent(entity, componentIndex, value) {
        switch(componentIndex) {
            case 0:
                entity.ngComponent0 = value;
                break;
            case 1:
                entity.ngComponent1 = value;
                break;
            case 2:
                entity.ngComponent2 = value;
                break;
            case 3:
                entity.ngComponent3 = value;
                break;
            case 4:
                entity.ngComponent4 = value;
                break;
            case 5:
                entity.ngComponent5 = value;
                break;
            case 6:
                entity.ngComponent6 = value;
                break;
            case 7:
                entity.ngComponent7 = value;
                break;
            case 8:
                entity.ngComponent8 = value;
                break;
            case 9:
                entity.ngComponent9 = value;
                break;
        }
    }

    var suite = new Benchmark.Suite();
    suite.add('entity with prepared by object components', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(preparedByObjectEntities);
    })
    .add('entity with prepared by null components', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(preparedByNullEntities);
    })
    .add('empty entities', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(emptyEntites);
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