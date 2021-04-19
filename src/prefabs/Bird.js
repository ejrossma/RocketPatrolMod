class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.points = pointValue; //store pointValue
        this.movespeed = game.settings.birdSpeed * speed; //pixels per frame
        this.dir = Phaser.Math.Between(0,1); //choose a random direction
        this.reset();
    }

    update() {
        //moving left
        if (this.dir == 1) {
            this.x -= this.movespeed;
        } else { //moving right
            this.x += this.movespeed;
        }
        //wrap around from left to right edge
        if (this.x <= 0 - this.width && this.dir == 1) {
            this.x = game.config.width;
        } else if (this.x >= game.config.width && this.dir != 1) {
            this.x = 0;
        }
    }

    //position reset
    reset() {
        this.dir = Phaser.Math.Between(0,1);
        //moving left
        if (this.dir == 1) {
            this.x = game.config.width + 5;
            this.flipX = false;
        } else { //moving right
            this.x = 0 - 5;
            this.flipX = true;
        }   
    }
}