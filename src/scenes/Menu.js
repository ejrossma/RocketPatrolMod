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
        this.load.image('tomato', './assets/tomato_small.png');
        this.load.image('farmer', './assets/farmer.png');
        
        //load sprites
        this.load.spritesheet('bird1', './assets/bird_fly_cycle.png', {
            frameWidth: 48,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 4
        });
        this.load.spritesheet('ufo', './assets/simple_ufo.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 2
        });

    }
    create() {
        //add background
        this.add.image(0, 0, 'background').setOrigin(0,0);
        //add title
        this.add.image(game.config.width/2, game.config.height/2 - 100, 'title').setOrigin(0.5);

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
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding - 75, 'Use D to change shooting angle', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding - 25, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 25, 'Press E for Easy or H for Hard', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 75, 'Shoot    &    to rack up points', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 125, 'Protect your   from    ', menuConfig).setOrigin(0.5);

        //line 4 tip images
        this.add.image(game.config.width/2 + 33, game.config.height/2 + borderUISize + borderPadding + 125, 'tomato').setOrigin(0.5);
        this.bird1 = this.add.sprite(game.config.width/2 + 160, game.config.height/2 + borderUISize + borderPadding + 130, 'bird1').setOrigin(0.5);

        //line 3 tip images
        this.bird = this.add.sprite(game.config.width/2 - 145, game.config.height/2 + borderUISize + borderPadding + 80, 'bird1').setOrigin(0.5);
        this.ufo1 = this.add.sprite(game.config.width/2 - 55, game.config.height/2 + borderUISize + borderPadding + 75, 'ufo').setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            //easy mode
            game.settings = {
                birdSpeed: 1,
                ufoSpeed: 1,
                gameTimer: 60000,
                bulletSpeed: 3
            }
            this.sound.play('sfx_select', { volume: 0.25 });
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            //easy mode
            game.settings = {
                birdSpeed: 1.5,
                ufoSpeed: 1.5,
                gameTimer: 45000,
                bulletSpeed: 4
            }
            this.sound.play('sfx_select', { volume: 0.25 });
            this.scene.start('playScene');
        }
    }
}

