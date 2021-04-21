class Tomato extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.scene = scene;
        this.onGround = true; //check if on ground
        this.beingTaken = false; //check for being taken
        this.fallSpeed = 2; //fall speed if dropped
        this.start = this.x;
        this.targettable = true; //can be taken by bird
        this.startTime = 0;
        this.resetting = false; //in reset mode
    }
    
    update(time) {
        //if its at desired position stop dropping
        if (this.y >= 400) {
            this.onGround = true;
        } else {
            this.onGround = false;
        }
        //if not on ground and no longer being taken then needs to fall
        if (!this.onGround && !this.beingTaken) this.y += this.fallSpeed;

        if (this.x <= 0 - this.width - borderUISize || this.x >= game.config.width + borderUISize) this.reset(time);

        if (this.resetting && time - this.startTime == 3) {
            this.alpha = 1;
            this.targettable = true;
            this.resetting = false;
            this.startTime = 0;
        }
    }

    reset(currTime) {
        this.x = this.start;
        this.y = 400;
        //have it grayed out (0.2 alpha) for 3 seconds
        this.targettable = false;
        this.alpha = 0.5;
        this.resetting = true;
        this.startTime = currTime;
        this.scene.p1Score -= 25;
        this.scene.scoreLeft.text = `PTS: ${this.scene.p1Score}`;
    }

}