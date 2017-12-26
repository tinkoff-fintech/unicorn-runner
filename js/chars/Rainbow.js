const RAINBOW = {
    imageURL: 'img/rainbow_line.png',
    frames: [
        {
            name: 'spark-1',
            rect: [0, 0, 83, 93]
        },
        {
            name: 'spark-2',
            rect: [83, 0, 83, 93]
        },
        {
            name: 'spark-3',
            rect: [166, 0, 83, 93]
        },
        {
            name: 'spark-4',
            rect: [249, 0, 83, 93]
        },
        {
            name: 'spark-5',
            rect: [332, 0, 83, 93]
        },
        {
            name: 'spark-6',
            rect: [415, 0, 83, 93]
        }
    ],
    animations: [
        {
            name: 'spark',
            frameLen: 0.2,
            frames: [
                'spark-1',
                'spark-2',
                'spark-3',
                'spark-4',
                'spark-5',
                'spark-6'
            ]
        }
    ]
};

function loadRainbow() {
    return loadSpriteSheet(RAINBOW)
    .then(createRainbowFactory);
}

class BehaviorRainbow extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.pickable.picked) {
            return;
        }

        us.pickable.pick();
        us.vel.set(30, -400);
        us.solid.obstructs = false;
    }
}


function createRainbowFactory(sprite) {
    const sparkAnim = sprite.animations.get('spark');

    function routeAnim(rainbow) {
        return sparkAnim(rainbow.lifetime);
    }

    function drawRainbow(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createRainbow() {
        const rainbow = new Entity();
        rainbow.size.set(83, 93);

        rainbow.addTrait(new Physics());
        rainbow.addTrait(new Solid());
        rainbow.addTrait(new Pickable());
        rainbow.addTrait(new BehaviorRainbow());

        rainbow.draw = drawRainbow;

        return rainbow;
    };
}
