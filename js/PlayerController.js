class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.scoreSelector = document.getElementById('unicorn-score');
    }

    setPlayer(entity) {
        this.player = entity;

        this.player.picker.onPick = () => {
            this.score += 50;

            setTimeout(() => {
                this.scoreSelector.innerHTML = this.score;
            }, 0);
        }
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)
           || this.player.pos.y > 1200
           || this.player.pos.x > 11400) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        }
    }
}
