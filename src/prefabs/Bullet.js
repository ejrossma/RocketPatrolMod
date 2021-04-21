//Bullet prefab
class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; //track firing status
        this.moveSpeed = 3; //pixels per frame
        this.scene = scene;
        this.angle = 1;
    }

    update() {
        //follow farmer
        if (!this.isFiring) {
            if (this.scene.farmer.angle == 0) {
                this.x = this.scene.farmer.x  - 40;
            } else if (this.scene.farmer.angle == 1) {
                this.x = this.scene.farmer.x;
            } else {
                this.x = this.scene.farmer.x + 40;
            }   
        }

        //NEED TO WORK ON MOVEMENT
        // if fired, move rocket up
        if (this.isFiring && this.scene.farmer.angle == 1) { //angle 1 is up
            this.y -= this.moveSpeed;
        } else if (this.isFiring && this.scene.farmer.angle == 0) { //angle 0 is left
            this.y -= this.moveSpeed;
            this.x -= this.moveSpeed;
        } else if (this.isFiring && this.scene.farmer.angle == 2) { //angle 2 is right
            this.y -= this.moveSpeed;
            this.x += this.moveSpeed;
        }
        //NEED TO WORK ON BOUNDS
        if (this.isFiring && (this.y <= borderUISize * 3 + borderPadding || this.x >= game.config.width - borderUISize + borderPadding || this.x <= borderUISize + borderPadding)) {
            console.log("resetting");
            this.reset();
        }
    }

    reset() {
        this.alpha = 0;
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 40;
        switch(this.angle) {
            case 0: //up
                this.x = this.scene.farmer.x;
            case 1: //left
                this.x = this.scene.farmer.x - 40;
            case 2: //right
                this.x = this.scene.farmer.x + 40;
        }   
    }
}