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
        this.load.image('cornfield', './assets/farm_patrol_bck.png');
        this.load.image('sky', './assets/sky_back.png');
        this.load.image('banner', './assets/banner.png');
        this.load.image('title', './assets/final_title_fp.png');
        
        this.load.spritesheet('bullet', './assets/bullet.png', {
            frameWidth: 8,
            frameHeight: 8,
            startFrame: 0,
            endFrame: 2
        });

        this.load.spritesheet('poof', './assets/bird_poof.png', {
            frameWidth: 48,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 2
        });
        this.load.spritesheet('smallexplosion', './assets/smallexplosion.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

        //Music from: https://www.youtube.com/watch?v=stpvwGUt_LE&ab_channel=RoyaltyFreeMusic-NoCopyrightMusic
        this.load.audio('music', './assets/Farm_patrol_background_music.mp3');
    }

    create() { //whatever is made first gets put furthest back
        //music
        this.music = this.sound.add('music');
        this.music.play({ loop: -1, volume: 0.25});

        //scrolling background
        this.sky = this.add.tileSprite(borderUISize, borderUISize + borderPadding + 5, 576, 175, 'sky').setOrigin(0,0);
        this.cornfield = this.add.image(borderUISize, borderUISize + borderPadding + 10, 'cornfield').setOrigin(0,0);

        //banner background
        this.add.image(0, borderUISize, 'banner').setOrigin(0,0); //x,y, width,height

        //title on top of banner
        this.add.image(game.config.width/4, borderUISize + borderPadding - 4, 'title').setOrigin(0,0);
        
        //add rocket (player 1)
        this.farmer = new Farmer(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add bullet
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('bullet', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        this.bullet = new Bullet(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 40, 'bullet').setOrigin(0.5, 0);
        this.bullet.anims.play('shoot');
        this.bullet.alpha = 0;

        //add tomatoes
        this.tomato1 = new Tomato(this, 90, 400, 'tomato', 0).setOrigin(0,0);
        this.tomato2 = new Tomato(this, 200, 400, 'tomato', 0).setOrigin(0,0);
        this.tomato3 = new Tomato(this, 420, 400, 'tomato', 0).setOrigin(0,0);
        this.tomato4 = new Tomato(this, 525, 400, 'tomato', 0).setOrigin(0,0);

        //add ufo
        this.anims.create({
            key: 'ufo_fly',
            frames: this.anims.generateFrameNumbers('ufo', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 3,
            repeat: -1,
            yoyo: true
        });
        this.ufo = new UFO(this, 0, borderUISize * 3, 'ufo', 0, 40).setOrigin(0,0);
        this.ufo.anims.play('ufo_fly');

        //add birds (x3)
        this.anims.create({
            key: 'bird_fly',
            frames: this.anims.generateFrameNumbers('bird1', {
                start: 0,
                end: 4,
                first: 0
            }),
            frameRate: 15,
            repeat: -1,
            yoyo: true
        });
        this.bird01 = new Bird(this, 0, borderUISize * 4, 'bird1', 0, 30, 1.75).setOrigin(0,0);
        this.bird01.anims.play('bird_fly');
        this.bird02 = new Bird(this, 0, borderUISize * 5 + borderPadding * 2, 'bird1', 0, 20, 1.5).setOrigin(0,0);
        this.bird02.anims.play('bird_fly');
        this.bird03 = new Bird(this, 0, borderUISize * 6 + borderPadding * 4, 'bird1', 0, 10, 1.25).setOrigin(0,0);
        this.bird03.anims.play('bird_fly');    

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'bird_poof',
            frames: this.anims.generateFrameNumbers('poof', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 30,
            yoyo: true
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
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or M for Menu', scoreConfig).setOrigin(0.5);
            this.timeText.text = 'Time: 0';
            this.gameOver = true;
            this.anims.pauseAll();
            this.music.stop();
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
            this.anims.resumeAll();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
        
        if (!this.gameOver) {
            //update timer
            var actualTime = Math.floor(this.clock.getElapsedSeconds());
            this.timeText.text = `Time: ${(game.settings.gameTimer/1000) - actualTime}`;
            
            //update background
            this.sky.tilePositionX -= starspeed/8;

            //update tomatoes
            this.tomato1.update(actualTime);
            this.tomato2.update(actualTime);
            this.tomato3.update(actualTime);
            this.tomato4.update(actualTime);

            //update farmer
            this.farmer.update();

            //update bullet
            this.bullet.update();

            //update spaceship
            this.bird01.update();
            this.bird02.update();
            this.bird03.update();

            //update UFO
            this.ufo.update();

        }

        //check collision
        if (this.bullet.alpha == 1) {

            if (this.checkCollision(this.bullet, this.bird01)) {
                this.bullet.reset();
                this.birdHit(this.bird01);
            }
            if (this.checkCollision(this.bullet, this.bird02)) {
                this.bullet.reset();
                this.birdHit(this.bird02);
            }
            if (this.checkCollision(this.bullet, this.bird03)) {
                this.bullet.reset();
                this.birdHit(this.bird03);
            }
            if (this.checkCollision(this.bullet, this.ufo)) {
                this.bullet.reset();
                this.ufoExplode(this.ufo);
            }

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

    checkTomatoCollision(bird, tomato) {
        //simple AABB checking
        if (bird.dir == 1) { //moving left

            if (bird.x < tomato.x + tomato.width && //left of bird to the left of right of tomato
                bird.x + bird.width > tomato.x + 20 && //right of bird to the right of left of tomato
                bird.y < tomato.y + tomato.height && //top of bird above the bottom of the tomato
                bird.height + bird.y > tomato.y + 10) { //bottom of bird below the top of tomato 
                    return true
            } else {
                return false;
            }

        } else { //moving right

            if (bird.x < tomato.x + tomato.width && //left of bird to the left of right of tomato
                bird.x + bird.width > tomato.x + 20 && //right of bird to the right of left of tomato
                bird.y < tomato.y + tomato.height && //top of bird above the bottom of the tomato
                bird.height + bird.y > tomato.y + 10) { //bottom of bird below the top of tomato
                    return true
            } else {
                return false;
            }

        }
        
    }

    moveTowards(vessel, target) {
        //this.dir 1 = moving left && this.dir 0 = moving right
        if (vessel.dir == 1 && vessel.x > target.x) { //moving left and the target is to the left
            
            if (target.y - vessel.y > vessel.x - target.x) {
                vessel.y += 1 + vessel.movespeed/3;
            } else if (target.y - vessel.y < vessel.x - target.x) {
                vessel.x -= 1 + vessel.movespeed/3;
            } else {
                vessel.x -= 1 + vessel.movespeed/3;
                vessel.y += 1 + vessel.movespeed/3;
            }

        } else if (vessel.dir == 0 && vessel.x < target.x) { //moving right and the target is to the right
            
            if (target.y - vessel.y > target.x - vessel.x) {
                vessel.y += 1 + vessel.movespeed/3;
            } else if (target.y - vessel.y < target.x - vessel.x) {
                vessel.x += 1 + vessel.movespeed/3;
            } else {
                vessel.x += 1 + vessel.movespeed/3;
                vessel.y += 1 + vessel.movespeed/3;
            }
        }
    }

    birdHit(bird) {
        //temporarily hide the bird
        bird.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(bird.x, bird.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('bird_poof');
        boom.on('animationcomplete', () => {
            bird.reset();
            bird.alpha = 1;
            boom.destroy();
        });
        this.p1Score += bird.points;
        this.scoreLeft.text = `PTS: ${this.p1Score}`;
        this.birdSound();
    }

    ufoExplode(ufo) {
        //temporarily hide the ufo
        ufo.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ufo.x + 16, ufo.y + 16, 'smallexplosion').setOrigin(0, 0);
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
                this.sound.play('sfx_hit_bird1', { volume: 0.25 });
            case 1:
                this.sound.play('sfx_hit_bird2', { volume: 0.25 });
            case 2:
                this.sound.play('sfx_hit_bird3', { volume: 0.25 });
        }
    }

    ufoSound() {
        var num = Phaser.Math.Between(0,2);
        switch (num) {
            case 0:
                this.sound.play('sfx_ufo_explode1', { volume: 0.25 });
            case 1:
                this.sound.play('sfx_ufo_explode2', { volume: 0.25 });
            case 2:
                this.sound.play('sfx_ufo_explode3', { volume: 0.25 });
        }
    }
}