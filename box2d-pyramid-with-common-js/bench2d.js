var world;

var PYRAMID_SIZE = 40;

function init() {
  var gravity = new Box2D.b2Vec2(0, -10);
  world = new Box2D.b2World(gravity, true);

  {    
    /**/
    var bd = new Box2D.b2BodyDef();
    var ground = world.CreateBody(bd);

    var shape = new Box2D.b2EdgeShape();
    shape.Set(new Box2D.b2Vec2(-40.0, 0.0), new Box2D.b2Vec2(40.0, 0.0));
    ground.CreateFixture(shape, 0.0);
    /*
    var bd = new Box2D.b2BodyDef();
    bd.set_position(new Box2D.b2Vec2(0.0, -5));

    var ground = world.CreateBody(bd);

    var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(-40.0, 5);

    ground.CreateFixture(shape, 0.0);
    */
  }

  {
    var a = .5;
    var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(a, a);

    var x = new Box2D.b2Vec2(-7.0, 0.75);
    var y = new Box2D.b2Vec2();
    var deltaX = new Box2D.b2Vec2(0.5625, 1);
    var deltaY = new Box2D.b2Vec2(1.125, 0.0);

    for (var i = 0; i < PYRAMID_SIZE; ++i) {
      y.Set(x.get_x(), x.get_y());

      for (var j = i; j < PYRAMID_SIZE; ++j) {
        var fd = new Box2D.b2FixtureDef();
        fd.set_density(5.0);
        fd.set_shape(shape);

        var bd = new Box2D.b2BodyDef();
        bd.set_type(Box2D.b2_dynamicBody);
        bd.set_position(new Box2D.b2Vec2(y.get_x(), y.get_y()));
        var body = world.CreateBody(bd);
        body.CreateFixture(fd);
        y.op_add(deltaY);
      }

      x.op_add(deltaX);
    }
  }
}

function step() {
  world.Step(1 / 60, 3, 3);
}

