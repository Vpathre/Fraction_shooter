/*Title: Fractions Game
Author: Viren Pathre (Resolute Education)
Date:22/7/22*/

var str =
    'function generate(){\n//add code functionality\n}';

var code = ".codemirror-textarea" [0];
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    extraKeys: {
        Tab: "autocomplete"
    },
    mode: {
        name: "javascript",
        globalVars: true
    },
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
});
editor.setValue(str);

class Ball {
    constructor(x, y, colour, scale, velocity_x, velocity_y, bounce, collide, answer) {
        this.physics.add.image(x, y, colour).setScale(scale);
        this.setVelocity(velocity_x, velocity_y);
        this.setBounce(bounce).setCollideWorldBounds(collide);
        this.answer = answer;
    }
}

//set configuration for the scene
var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 300
            }
        },
        matter: {
            debug: true,
            gravity: {
                y: 0.1
            }
        }
    },
    scene: [Level_1, Level_2, Level_3, Level_4, Level_5]
};

//start new game scene
const gameScene = new Phaser.Game(config);