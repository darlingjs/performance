/**
 * Project: darlingjs / GameEngine.
 * Copyright (c) 2013, Eugene-Krevenets
 */
(function() {
    'use strict';

    //Run tests
var ENTITY_COUNT = 100,
    COMPONENTS_COUNT = 10;

function buildEntity() {
    return {
        $name: 'entity'
    };
}                                                          g

function buildEntities(entityCount, componentCount, value) {
    var result = [];
    while(--entityCount>=0) {
        var entity = buildEntity();
        for(var i = 0; i < componentCount; i++) {
            buildComponent(entity, i, value);
            if (getComponentByComponentIndexDirect(entity, i)) {
                getComponentByComponentIndexDirect(entity, i).count = 0;
            }
        }
        result.push(entity);
    }

    return result;
}

var emptyEntities = buildEntities(ENTITY_COUNT, 0),
    preparedByObjectEntities = buildEntities(ENTITY_COUNT, COMPONENTS_COUNT, {}),
    preparedByNullEntities = buildEntities(ENTITY_COUNT, COMPONENTS_COUNT, null);

function getRandomComponentOfRandomEntityAndIncreaseOfCount(entites, getComponentByComponentIndex) {
    var entity = entites[Math.floor(ENTITY_COUNT * Math.random())];
    var componentIndex = Math.floor(COMPONENTS_COUNT * Math.random());
    if(!getComponentByComponentIndex(entity, componentIndex)) {
        buildComponent(entity, componentIndex, {});
        getComponentByComponentIndex(entity, componentIndex).count = 0;
    }

    getComponentByComponentIndex(entity, componentIndex).count++;
}

function getComponentByComponentIndexDirect(entity, componentIndex) {
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
        default:
            throw new Error('out of range');
    }
}

function getComponentByComponentIndexDynamic(entity, componentIndex) {
    return entity['ngComponent' + componentIndex];
}

function buildComponent(entity, componentIndex, value) {
    entity['ngComponent' + componentIndex] = value;
}

    var suite = new Benchmark.Suite();
    suite.add('entity with prepared by object components (direct access)', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(preparedByObjectEntities, getComponentByComponentIndexDirect);
    })
    .add('entity with prepared by null components (direct access)', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(preparedByNullEntities, getComponentByComponentIndexDirect);
    })
    .add('entity with prepared by null components (dynamic access)', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(preparedByNullEntities, getComponentByComponentIndexDynamic);
    })
    .add('empty entities (direct access)', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(emptyEntities, getComponentByComponentIndexDirect);
    })
    .add('empty entities (dynamic access)', function() {
        getRandomComponentOfRandomEntityAndIncreaseOfCount(emptyEntities, getComponentByComponentIndexDynamic);
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