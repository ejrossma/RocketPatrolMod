// init() prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene"); //when we call menu we want to use phaser scene giving it menuScene
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        //gun
        this.load.audio('sfx_gun', './assets/gun_shoot.wav');
        //ufo explosions
        this.load.audio('sfx_ufo_explode1', './assets/ufo_explode1.wav');        
        this.load.audio('sfx_ufo_explode2', './assets/ufo_explode2.wav');
        this.load.audio('sfx_ufo_explode3', './assets/ufo_explode3.wav');
        //bird hit
        this.load.audio('sfx_hit_bird1', './assets/hit_bird1.wav');
        this.load.audio('sfx_hit_bird2', './assets/hit_bird2.wav');
        this.load.audio('sfx_hit_bird3', './assets/hit_bird3.wav');
        
        //load images
        this.load.image('title', './assets/final_title_fp.png');
        this.load.image('background', './assets/menu_background.png');
    }
    create() {
        //add background
        this.add.image(0, 0, 'background').setOrigin(0,0);
        //add title
        this.add.image(game.config.width/2, game.config.height/2, 'title').setOrigin(0.5);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 25, 'Use ← → arrows to aim & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 25, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                birdSpeed: 1,
                ufoSpeed: 1,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //easy mode
            game.settings = {
                birdSpeed: 2,
                ufoSpeed: 2,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}

