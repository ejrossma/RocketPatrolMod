class Tomato extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.onGround = true;
        this.beingTaken = false;
        this.fallSpeed = 2;
        this.start = this.x;
        this.targettable = true;
        this.startTime = 0;
        this.resetting = false;
    }
    
    update(time) {
        //if its at desired position stop dropping
        if (this.y >= 370) {
            this.onGround = true;
        } else {
            this.onGround = false;
        }
        //if not on ground and no longer being taken then needs to fall
        if (!this.onGround && !this.beingTaken) this.y += this.fallSpeed;

        if (this.x <= 0 - this.width || this.x >= game.config.width) this.reset(time);

        if (this.resetting && time - this.startTime == 3) {
            this.alpha = 1;
            this.targettable = true;
            this.resetting = false;
        }
    }

    reset(currTime) {
        this.x = this.start;
        this.y = 370;
        //have it grayed out (0.2 alpha) for 3 seconds
        this.targettable = false;
        this.alpha = 0.5;
        this.resetting = true;
        this.startTime = currTime;
        /*
        this.clock = this.time.delayedCall(3000, () => {
            this.alpha = 1;
            this.targettable = true;
        }, null, this);
        */
    }

}