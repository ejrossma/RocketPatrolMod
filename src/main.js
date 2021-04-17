//Elijah Rossman
//4/16/21
//8 Hours so far

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

    Firing UI Text: 5pts                                                  (Total: 10)
        Whenever the player fires the 'Firing' text pops up in the top right corner.

    Randomize Ship Direction: 5pts                                        (Total: 15)
        All enemies spawn randomly on either the right or left sides.

    Add Background Music: 5pts                                            (Total: 20)
        I hope you like the music.

    Animated Sprite for Enemies: 10pts                                    (Total: 30) NEED TO DO
        Changed Enemy Sprites and Animated them.

    New Title Screen: 10pts                                               (Total: 40)
        Made a Title Screen Using Pixel Art :D

    New Spaceship Type: 20pts                                             (Total: 60)
        Made a Small Ship that alternates between moving up and down.

    Redesign Game's Design: 60pts                                         (Total: 120)
        Space Patrol -> Farm Patrol. I changed space patrol to be based on a farmer and 
        the various things that try to steal their crops.
        
    Enemies Attempt to Steal Crops & Take Points When They Succeed: 25pts (Total: 145)
        The enemies randomly decide whether they are going to attempt to steal a crop.
        Then they begin to take it and the player has a window to stop them before they lose points.
*/
