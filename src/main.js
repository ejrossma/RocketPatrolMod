//Elijah Rossman
//4/16/21
//26 Hours so far
//I am coming to the understanding that the scope of project that I laid out was extremely ambitious and doesn't allow me to polish my game very much.
//I am dipping into the grace period to make sure I turn in a finished product that can accomplish my base goals that I set out for my game.

//game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starspeed = 4;

let highscore = 0;

//reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;

/*POINTS BREAKDOWN -------------------------- 

    High Score: 5pts                                                      (Total: 5)
        Added a high Score that is displayed after every game and persists through scene changes.

    Randomize Ship Direction: 5pts                                        (Total: 10)
        All enemies spawn randomly on either the right or left sides.

    Add Background Music: 5pts                                            (Total: 15) NEED TO DO
        I hope you like the music.

    Create New Scrolling Sprite for Background: 5pts                      (Total: 20)
        I made a nice sky with some clouds.

    Implement Speed Increase: 5pts                                        (Total: 25) NEED TO DO
        Added 'Rapid Fire' for the last 10 seconds. 
        Where there is no cap on how many projectiles the player can shoot 
        & the speed increases.

    Animated Sprite for Enemies: 10pts                                    (Total: 35) NEED TO DO
        Changed Enemy Sprites and Animated them.

    New Title Screen: 10pts                                               (Total: 45)
        Made a Title Screen Using Pixel Art :D

    Display The Time Remaining: 10pts                                     (Total: 55)
        I put the timer in the top right.                                 

    Create New Explosion SFX: 10pts                                       (Total: 65)
        I used BFXR to make 3 new ufo explosion sounds
        & 3 new bird hit sounds

    New Spaceship Type: 20pts                                             (Total: 85)
        Made a UFO that alternates between moving up and down.

    Create and Implement a New Weapon: 20pts                              (Total: 105) NEED TO DO
        The farmer wields a gun to take down the birds who are stealing his crops.
        The player aims it and then shoots a projectile which they cannot control.

    Redesign Game's Design: 60pts                                         (Total: 165)
        Space Patrol -> Farm Patrol. I changed space patrol to be based on a farmer and 
        the various things that try to steal their crops.
        
    (Okayed by Nathan) Implement Crops & Enemies Steal Crops: 25pts       (Total: 190) NEED TO DO
        The enemies randomly decide whether they are going to attempt to steal a crop.
        Then they begin to take it and the player has a window to stop them before they lose points.
*/
