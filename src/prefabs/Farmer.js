//Farmer (player) prefab
class Farmer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 3; //pixels per frame
        this.scene = scene;
        this.angle = 1;
        this.sfxRocket = scene.sound.add('sfx_gun', { volume: 0.25 }); //add gun sfx
        this.diff = -1;
    }

    update() {
        //left and right movement
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            console.log("hi");
            if (this.angle == 0 || this.angle == 2) {
                this.angle = 1;
            } else {
                this.diff *= -1;
                this.angle += this.diff;
            }
            console.log(this.angle);
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.scene.bullet.isFiring) {
            this.sfxRocket.play(); //play sound
            this.scene.bullet.isFiring = true;
            this.scene.bullet.alpha = 1;
        }
    }
}