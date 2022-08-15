/*Title: Fractions Game
Author: Resolute Education (Viren Pathre)
Date:22/7/22*/

var questions_array = [];

// var str =
//     'function generate(){\n//add code functionality\n}';

// var code = ".codemirror-textarea" [0];
// var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
//     extraKeys: {
//         Tab: "autocomplete"
//     },
//     mode: {
//         name: "javascript",
//         globalVars: true
//     },
//     theme: "dracula",
//     lineNumbers: true,
//     autoCloseBrackets: true,
// });
// editor.setValue(str);


class Questions {
    constructor(numerator, denominator, asked) {
        this.numerator = numerator;
        this.denominator = denominator;
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

// populate array with 200 questions that can be recycled and rearranged
function initializeArray() {
    for (let i = 0; i < 200; i++) {
        let temp0 = rand_interval(0, 12);
        let temp1 = rand_interval(temp0, 15);
        questions_array.push(new Questions(temp0, temp1, false));
    }
}


function rand_interval(begin, end) {
    return Math.floor(Math.random() * (end - begin + 1) + begin);
}

// // try to generate random question string and answer
// function fraction_randomizer() {
//     let num1 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
//     let den1 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
//     let num2 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
//     let den2 = (Math.floor(Math.random() * (199 - 1 + 1) + 1));
//     let operator;

//     switch (Math.floor(Math.random() * (4 - 1 + 1) + 1)) {
//         case 1:
//             operator = "+";
//             break;
//         case 2:
//             operator = "-";
//             break;
//         case 3:
//             operator = "*";
//             break;
//         case 4:
//             operator = "/";
//             break;
//     }

//     let ques = num1 + "/" + den1 + operator + num2 + "/" + den2;
//     let ans = eval(ques);
//     return [ques, ans];
// }

initializeArray();

//set configuration for the scene
var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 600,
    physics: {
        default: 'matter',
        arcade: {
            debug: true,
            gravity: {
                y: 300
            }
        },
        matter: {
            debug: true,
            gravity: {
                y: 0.8
            }
        }
    },
    // scene: [Level_1]
    // scene: [Level_2]
    scene: [Level_3]
    // Level_1, Level_2
    // Level_4,
    // Level_5
};

//start new game scene
const gameScene = new Phaser.Game(config);