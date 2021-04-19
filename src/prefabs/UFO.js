class UFO extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.points = pointValue; //store pointValue
        this.movespeed = game.settings.ufoSpeed; //pixels per frame
        this.count = 0; //when to change direction
        this.upwards = -1; //y direction
        this.dir = Phaser.Math.Between(0,1); //choose a random x direction
        this.reset();
    }

    update() {
        //right to left
        if (this.dir == 1) {
            this.x -= this.movespeed;
        } else { //left to right
            this.x += this.movespeed;
        }
        if (this.count++ % 50 === 0) {
            this.upwards *= -1;
        }
        this.y += this.upwards;
        //wrap around from right to left edge
        if (this.x >= game.config.width - this.width && this.dir != 1) {
            this.x = 0 - this.width;
        } else if (this.x <= 0 && this.dir == 1) {
            this.x = game.config.width;
        }
    }

    //position reset
    reset() {
        this.dir = Phaser.Math.Between(0,1);
        //right to left
        if (this.dir == 1) {
            this.x = game.config.width;
            this.flipX = true;
        } else { //left to right
            this.x = 0;
            this.flipX = false;
        }
    }
}