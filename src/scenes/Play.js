// init() prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects

class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); //when we call menu we want to use phaser scene giving it menuScene
    }

    preload() {
        // load images + tile sprites
        this.load.image('rocket', './assets/rocket.png'); //key + file location
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('cornfield', './assets/farm_patrol_bck.png');
        this.load.image('smallspaceship', './assets/smallspaceship.png');
        this.load.image('banner', './assets/banner.png');
        this.load.image('title', './assets/final_title_fp.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('smallexplosion', './assets/smallexplosion.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() { //whatever is made first gets put furthest back
        //scrolling background
        this.starfield = this.add.image(borderUISize, borderUISize + borderPadding + 10, 'cornfield').setOrigin(0,0);

        //banner background
        this.add.image(0, borderUISize, 'banner').setOrigin(0,0); //x,y, width,height

        //title on top of banner
        this.add.image(game.config.width/4, borderUISize + borderPadding - 4, 'title').setOrigin(0,0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add spaceship (x3)
        this.ship01 = new Spaceship(this, 0, borderUISize * 4, 'spaceship', 0, 50, 2).setOrigin(0,0);
        this.ship02 = new Spaceship(this, 0, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, 1.5).setOrigin(0,0);
        this.ship03 = new Spaceship(this, 0, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10, 1.25).setOrigin(0,0);

        //add smallspaceship
        this.smallship = new SmallSpaceship(this, 0, borderUISize * 4, 'smallspaceship', 0, 30).setOrigin(0,0);
        

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'smallexplode',
            frames: this.anims.generateFrameNumbers('smallexplosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 80
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding + 7, 
        `PTS: ${this.p1Score}`, scoreConfig);

        this.firetext = this.add.text(game.config.width - borderUISize - borderPadding * 9, borderUISize + borderPadding + 7,
        'FIRING', fireConfig);
        
        //GAME OVER flag
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > highscore) { highscore = this.p1Score; }
            this.add.text(game.config.width/2, game.config.height/2 - 64, `HIGH SCORE: ${highscore}`, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //brown borders
        //horizontal
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x795548).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, 
        borderUISize, 0x795548).setOrigin(0,0);
        //vertical
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x795548).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, 
        game.config.height, 0x795548).setOrigin(0,0);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
        
        if (!this.gameOver) {
            //update background
            this.starfield.tilePositionX -= starspeed;

            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            //update smallspaceship
            this.smallship.update();

            //check if firing
            if (this.p1Rocket.isFiring) { this.firetext.alpha = 1; } else { this.firetext.alpha = 0; }
        }

        //check collision
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.smallship)) {
            this.p1Rocket.reset();
            this.shipSmallExplode(this.smallship);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide the ship
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = `PTS: ${this.p1Score}`;
        this.sound.play('sfx_explosion');
    }

    shipSmallExplode(ship) {
        //temporarily hide the ship
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'smallexplosion').setOrigin(0, 0);
        boom.anims.play('smallexplode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = `PTS: ${this.p1Score}`;
        this.sound.play('sfx_explosion');        
    }
}