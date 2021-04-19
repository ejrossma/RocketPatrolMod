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
        //key + file location
        this.load.image('bird1', './assets/spaceship.png');
        this.load.image('cornfield', './assets/farm_patrol_bck.png');
        this.load.image('sky', './assets/sky_back.png');
        this.load.image('ufo', './assets/smallspaceship.png');
        this.load.image('banner', './assets/banner.png');
        this.load.image('title', './assets/final_title_fp.png');
        this.load.image('tomato', './assets/tomato.png');

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
        this.sky = this.add.tileSprite(borderUISize, borderUISize + borderPadding + 5, 576, 175, 'sky').setOrigin(0,0);
        this.cornfield = this.add.image(borderUISize, borderUISize + borderPadding + 10, 'cornfield').setOrigin(0,0);

        //banner background
        this.add.image(0, borderUISize, 'banner').setOrigin(0,0); //x,y, width,height

        //title on top of banner
        this.add.image(game.config.width/4, borderUISize + borderPadding - 4, 'title').setOrigin(0,0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add birds (x3)
        this.bird01 = new Bird(this, 0, borderUISize * 4, 'bird1', 0, 50, 2).setOrigin(0,0);
        this.bird02 = new Bird(this, 0, borderUISize * 5 + borderPadding * 2, 'bird1', 0, 20, 1.5).setOrigin(0,0);
        this.bird03 = new Bird(this, 0, borderUISize * 6 + borderPadding * 4, 'bird1', 0, 10, 1.25).setOrigin(0,0);

        //add ufo
        this.ufo = new UFO(this, 0, borderUISize * 4, 'ufo', 0, 30).setOrigin(0,0);

        //add tomatoes
        this.tomato1 = new Tomato(this, 65, 370, 'tomato', 0).setOrigin(0,0);
        this.tomato2 = new Tomato(this, 175, 370, 'tomato', 0).setOrigin(0,0);
        this.tomato3 = new Tomato(this, 392, 370, 'tomato', 0).setOrigin(0,0);
        this.tomato4 = new Tomato(this, 500, 370, 'tomato', 0).setOrigin(0,0);
        

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

        //points
        this.scoreLeft = this.add.text(borderUISize + borderPadding * 2, borderUISize + borderPadding + 7, 
        `PTS: ${this.p1Score}`, scoreConfig);

        //timer
        this.timeText = this.add.text(game.config.width - borderUISize - borderPadding * 10, borderUISize + borderPadding + 7, `Time: ${game.settings.gameTimer/1000}`, scoreConfig);
        
        //GAME OVER flag
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > highscore) { highscore = this.p1Score; }
            this.add.text(game.config.width/2, game.config.height/2 - 64, `HIGH SCORE: ${highscore}`, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.timeText.text = 'Time: 0';
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
            //update timer
            var actualTime = Math.floor(this.clock.getElapsedSeconds());
            this.timeText.text = `Time: ${(game.settings.gameTimer/1000) - actualTime}`;
            
            //update background
            this.sky.tilePositionX -= starspeed/8;

            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.bird01.update();
            this.bird02.update();
            this.bird03.update();

            //update UFO
            this.ufo.update();

            //update tomatoes
            this.tomato1.update(actualTime);
            this.tomato2.update(actualTime);
            this.tomato3.update(actualTime);
            this.tomato4.update(actualTime);
        }

        //check collision
        if (this.checkCollision(this.p1Rocket, this.bird01)) {
            this.p1Rocket.reset();
            this.birdHit(this.bird01);
        }
        if (this.checkCollision(this.p1Rocket, this.bird02)) {
            this.p1Rocket.reset();
            this.birdHit(this.bird02);
        }
        if (this.checkCollision(this.p1Rocket, this.bird03)) {
            this.p1Rocket.reset();
            this.birdHit(this.bird03);
        }
        if (this.checkCollision(this.p1Rocket, this.ufo)) {
            this.p1Rocket.reset();
            this.shipSmallExplode(this.ufo);
        }
    }

    checkCollision(bullet, vessel) {
        //simple AABB checking
        if (bullet.x < vessel.x + vessel.width &&
            bullet.x + bullet.width > vessel.x &&
            bullet.y < vessel.y + vessel.height &&
            bullet.height + bullet.y > vessel.y) {
                return true
        } else {
            return false;
        }
    }

    birdHit(bird) {
        //temporarily hide the bird
        bird.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(bird.x, bird.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            bird.reset();
            bird.alpha = 1;
            boom.destroy();
        });
        this.p1Score += bird.points;
        this.scoreLeft.text = `PTS: ${this.p1Score}`;
        this.birdSound();
    }

    shipSmallExplode(ufo) {
        //temporarily hide the ufo
        ufo.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ufo.x, ufo.y, 'smallexplosion').setOrigin(0, 0);
        boom.anims.play('smallexplode');
        boom.on('animationcomplete', () => {
            ufo.reset();
            ufo.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ufo.points;
        this.scoreLeft.text = `PTS: ${this.p1Score}`;
        this.ufoSound();       
    }

    birdSound() {
        var num = Phaser.Math.Between(0,2);
        switch (num) {
            case 0:
                this.sound.play('sfx_hit_bird1');
            case 1:
                this.sound.play('sfx_hit_bird2');
            case 2:
                this.sound.play('sfx_hit_bird3');
        }
    }

    ufoSound() {
        var num = Phaser.Math.Between(0,2);
        switch (num) {
            case 0:
                this.sound.play('sfx_ufo_explode1');
            case 1:
                this.sound.play('sfx_ufo_explode2');
            case 2:
                this.sound.play('sfx_ufo_explode3');
        }
    }
}