/*Title: Fractions Game
Author: Viren Pathre (Resolute Education)
Date:22/7/22*/

var questions_array = [];

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

class Questions {
    constructor(question, answer, asked) {
        this.question = question;
        this.answer = answer;
        this.asked = asked;
    }


    getRandomQuestion() {
        let send = questions_array[Math.floor(Math.random() * (questions_array.length - 1 - 0 + 1) + 0)];
        while (send.asked == true) {
            send = questions_array[Math.floor(Math.random() * (questions_array.length - 1 - 0 + 1) + 0)];
        }
        return [send.question, send.answer];
    }
}

// populate array with questions
function initializeArray() {
    for (let i = 0; i < 200; i++) {
        let temp = fraction_randomizer()
        questions_array.push(new Questions(temp[0], temp[1], false));
    }
}

// try to generate random question string and answer
function fraction_randomizer() {
    let num1 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
    let den1 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
    let num2 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
    let den2 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
    let operator;

    switch (Math.floor(Math.random() * (4 - 1 + 1) + 1)) {
        case 1:
            operator = "+";
            break;
        case 2:
            operator = "-";
            break;
        case 3:
            operator = "*";
            break;
        case 4:
            operator = "/";
            break;
    }

    let ques = num1 + "/" + den1 + operator + num2 + "/" + den2;
    let ans = eval(ques);
    return [ques, ans];
}

initializeArray();

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
    scene: [Level_1,
        Level_2,
        Level_3,
        Level_4,
        Level_5
    ]
};

//start new game scene
const gameScene = new Phaser.Game(config);