class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.scene = scene; //reference to scene
        this.points = pointValue; //store pointValue
        this.movespeed = game.settings.birdSpeed * speed; //pixels per frame
        this.dir = Phaser.Math.Between(0,1); //choose a random direction
        this.startY = this.y;
        this.reset();
        this.stealing = false;
        this.targetTomato;
        this.holdingTomato;
    }

    update() {
        //if stealing
        if (this.stealing && !this.holdingTomato) {
            if (this.scene.checkTomatoCollision(this, this.targetTomato)) {
                this.targetTomato.beingTaken = true;
                this.holdingTomato = true;
            } else {
                this.scene.moveTowards(this, this.targetTomato);
            }
        }

        //moving left
        if (this.dir == 1 && !this.stealing)  {
            this.x -= this.movespeed;
        } else if (this.dir == 0 && !this.stealing) { //moving right
            this.x += this.movespeed;
        }

        //moving with tomato
        if (this.dir == 1 && this.stealing && this.holdingTomato) {
            this.x -= this.movespeed/3; 
            if (!this.targetTomato.resetting) this.targetTomato.x -= this.movespeed/3;
            if (this.y > this.startY) { this.y -= this.movespeed/3; this.targetTomato.y -= this.movespeed/3; }             
        } else if (this.dir == 0 && this.stealing && this.holdingTomato) {
            this.x += this.movespeed/3; 
            if (!this.targetTomato.resetting) this.targetTomato.x += this.movespeed/3;
            if (this.y > this.startY) { this.y -= this.movespeed/3; this.targetTomato.y -= this.movespeed/3; }
        }

        //wrap around from left to right edge
        if (this.x <= 0 - this.width && this.dir == 1) {
            this.x = game.config.width;
            this.y = this.startY;
            this.stealing = false;
            this.holdingTomato = false;
        } else if (this.x >= game.config.width + borderUISize && this.dir != 1) {
            this.x = 0;
            this.y = this.startY;
            this.stealing = false;
            this.holdingTomato = false;
        }
    }

    //position reset
    reset() {
        this.dir = Phaser.Math.Between(0,1);
        //moving left
        if (this.dir == 1) {
            this.x = game.config.width + 5;
            this.y = this.startY;
            this.flipX = false;
            this.stealing = false;
            if (this.holdingTomato) {
                this.holdingTomato = false;
                this.targetTomato.beingTaken = false;
            }       
        } else { //moving right
            this.x = 0 - 5;
            this.y = this.startY;
            this.flipX = true;
            this.stealing = false;
            if (this.holdingTomato) {
                this.holdingTomato = false;
                this.targetTomato.beingTaken = false;
            }
        }   
    }

    stealTomato(tomato) {
        this.stealing = true;
        this.targetTomato = tomato;
    }
}