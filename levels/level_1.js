var platform = null;
var circle, body;

// Constants
var velocity_x = 200;
var velocity_y = 200;
var gravity = 400;

// globals for new ball
var ball;

// global for fraction line on ball
var line1, line2;
var constraint = true;
var cons;
var graphics;

// globals for input keys
var SPACE;
var LEFT;
var RIGHT;
var UP;
var DOWN;

// make global variable to store the questions that are asked in the level
var questions = [];
var current_question;
var baskets = [];

// text for scorekeeping
var total_score, current_score;
var ball_num, ball_den;
var ball_num_text, ball_den_text;
var total_score_keeper = 0;
var current_score_keeper = 100;
var total_score_text, current_score_text;
var level_counter = 0;
var timer = 800;
var interval;


var Body = Phaser.Physics.Matter.Matter.Body;
var Bodies = Phaser.Physics.Matter.Matter.Bodies;
var Composite = Phaser.Physics.Matter.Matter.Composite;
var Parser = Phaser.Physics.Matter.PhysicsEditorParser;
var Matter = Phaser.Physics.Matter.Matter;


// Class to Level 1 scene
class Level_1 extends Phaser.Scene {
    constructor() {
        super({
            key: "Level_1"
        });
    }

    preload() {
        this.load.image('red', 'assets/red.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('white', 'assets/white.png');
        this.load.image('background', 'assets/sky_background.jpg');
        this.load.image('platform', 'assets/platform.jpg');
        this.load.image('white_rect', 'assets/white_rectangle.png');
        this.load.image('black_rect', 'assets/black_rectangle.png');
    }

    create() {

        // add background image
        this.add.image(400, 300, 'background').setScale(2, 2);

        // create the platform at the top of the page
        this.matter.add.image(375, 0, 'platform', null, {
            isStatic: true
        }).setScale(0.05, 0.5);

        // create and place baskets on the screen
        var basket = '60 0 70 0 70 90 130 90 130 0 140 0 140 100 60 100 60 0';

        for (var i = 0; i < 7; i++) {
            var poly = this.add.polygon(60 + (105 * i), 560, basket, 0x000000, 0.8);
            baskets.push(poly);
            this.matter.add.gameObject(poly, {
                shape: {
                    type: 'fromVerts',
                    verts: basket,
                    flagInternal: true
                },
                isStatic: true
            }).setScale(1.1, 1.1);
        }

        // fill baskets with answer "blocks"
        // create coloured blocks worth numerator
        // total blocks worth denominator
        // randomly allocate block representations between the 7 baskets

        for (let i = 0; i < 7; i++) {
            let temp = this.rand_interval(0, 199);
            this.block_creator(i, questions_array[temp].numerator, questions_array[temp].denominator);
            questions.push(questions_array[temp]);
        }


        // add bounds to this world
        let bounds = this.matter.world.setBounds(0, 0, 750, 600);


        // line2 = this.add.line(cons.bodyB.x, cons.bodyB.y, cons.bodyB.x, cons.bodyB.y, cons.pointA.x, cons.pointA.y, 0xF5F514);
        graphics = this.add.graphics();
        graphics.lineStyle(128, 0xffffff, 1);
        line2 = graphics.lineBetween(375, 50, 475, 100);


        this.ball_creator();


        total_score_text = this.add.text(5, 10, 'Total Score: ' + total_score_keeper, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });

        current_score_text = this.add.text(5, 40, 'Current Score: ' + current_score_keeper, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });
        current_score_keeper--;


        setInterval(() => {
            total_score_text.destroy();
            current_score_text.destroy();

            total_score_text = this.add.text(5, 10, 'Total Score: ' + total_score_keeper, {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
            });

            current_score_text = this.add.text(5, 40, 'Current Score: ' + current_score_keeper, {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
            });
            current_score_keeper--;
        }, timer);

    }


    update(delta) {
        // destroy lines and text added during rendering update
        line1.destroy();
        line2.destroy();
        ball_num_text.destroy();
        ball_den_text.destroy();

        // setTimeout(this.scoreKeeper, 0);

        // update the ball speed, make it swing
        if (ball.y < 50 && ball.x < 375) {
            ball.setVelocity(12);
        } else if (ball.y < 50 && ball.x > 375) {
            ball.setVelocity(12);
        }

        // check for key presses
        if (LEFT.isDown) {
            ball.setVelocityX(-2);
        }

        if (RIGHT.isDown) {
            ball.setVelocityX(2);
        }

        if (UP.isDown) {
            ball.setVelocityY(-1.75);
        }

        line1 = this.add.line(ball.x, ball.y, 0, 0, 30, 0, 0x000000);

        ball_num_text = this.add.text(ball.x - 5, ball.y - 20, ball_num, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });
        ball_den_text = this.add.text(ball.x - 7, ball.y - 1, ball_den, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });

        this.logic_checker(ball, current_question);
    }


    ball_creator() {
        // create ball
        circle = this.add.circle(300, 45, 22, 0xF21818);
        body = this.matter.add.circle(300, 45, 22);
        ball = this.matter.add.gameObject(circle, body);
        ball.frictionAir = 0;
        body.restitution = 0.5;
        cons = this.matter.add.worldConstraint(body, 120, 1, {
            pointA: {
                x: 375,
                y: 50
            },
            bodyB: body
        });


        // add line for fraction representation to the ball
        line1 = this.add.line(ball.x, ball.y, ball.x, ball.y, ball.x, ball.y, 0x000000);

        // Add input keys to the scene
        // SPACEBAR
        this.input.keyboard.on('keydown-SPACE', function () {
            cons.pointA = null;
            cons.bodyB = null;
            line2.destroy();
            constraint = false;
        }, this);

        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.ask_question();
        ball_num = current_question.numerator;
        ball_den = current_question.denominator;
        ball_num_text = this.add.text(ball.x, ball.y - 15, ball_num, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });
        ball_den_text = this.add.text(ball.x, ball.y + 15, ball_den, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });
    }


    /**
     * Generates a random value occuring in a provided interval
     * @param {begin} begin: first value of the interval of interest
     * @param {end} end: last value of the interval of interest
     * @returns random value
     */
    rand_interval(begin, end) {
        return Math.floor(Math.random() * (end - begin + 1) + begin);
    }


    /**
     * Function used to deal with generating platforms for each level; unique platforms for each level
     * @param {platform} platform static group type passed in as a parameter
     */
    level_platforms(platform) {
        var shooting_board = platform.create(100, 300, 'platform').setScale(0.15, 0.07).refreshBody();
        var ledge1 = platform.create(575, 400, 'platform').setScale(0.25, 0.07).refreshBody();
        var ledge2 = platform.create(575, 200, 'platform').setScale(0.25, 0.07).refreshBody();
        ledge1.body.immovable, ledge2.body.immovable = true; //surface doesn't move
    }


    // based on the index of the basket, the blocks
    block_creator(number, numerator, total) {
        // draw the total number of blocks in each respective basket
        for (let i = 0; i < total; i++) {
            // if numerator is 0
            if (numerator == 0) {
                return;
            }

            // if denominator is 0
            else if (total == 0) {
                return;
            }

            // if the block is a numerator, color it
            else if (i + 1 <= numerator) {
                const ans = this.add.rectangle(60 + (105 * number), 580 - (10 * i), 60, Math.floor(90 / total), 0x000000);
                const body = this.matter.add.rectangle(60 + (105 * number), 580 - (10 * i), 60, Math.floor(90 / total), {
                    isStatic: false,
                    restitution: 1
                });
                ans.setStrokeStyle(2, "0xF5EA14");
                var ledge = this.matter.add.gameObject(ans, body);

            }
            // if denominator, colour it white or something else
            else {
                const ans = this.add.rectangle(60 + (105 * number), 580 - (10 * i), 60, Math.floor(90 / total), 0xFFFFFF);
                const body = this.matter.add.rectangle(60 + (105 * number), 580 - (10 * i), 60, Math.floor(90 / total), {
                    isStatic: false,
                    restitution: 1
                });
                ans.setStrokeStyle(2, "0xF5EA14");
                var ledge = this.matter.add.gameObject(ans, body);
            }

            // this.tweens.add({
            //     targets: ledge,
            //     alpha: 0.5,
            //     yoyo: true,
            //     repeat: -1,
            //     ease: 'Sine.easeInOut'

            // });
        }
    }


    // random colour generator
    rand_hex() {
        var hex_char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var hex_value = ['#'];

        for (let i = 0; i < 6; i++) {
            hex_value.push(hex_char[this.rand_interval(0, hex_char.length - 1)]);
        }
        // return hex_value.join('');
        return parseInt(hex_value.join('').replace(/^#/, '0X'), 16);
    }


    scoreKeeper() {
        total_score_text.destroy();
        current_score_text.destroy();
        total_score_text = this.add.text(5, 10, 'Total Score: ' + total_score_keeper, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });

        current_score_text = this.add.text(5, 40, 'Current Score: ' + current_score_keeper, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        });
        current_score_keeper--;
    }


    ask_question() {
        let temp = questions[this.rand_interval(0, questions.length - 1)];

        if (temp.asked) {
            this.ask_question()
        } else {
            level_counter++;
            current_question = temp;
            temp.asked = true;
            return;
        }

        if (level_counter == 7) {
            alert("LEVEL COMPLETED");
            // this.scene.start("Level_2");
            // ball.destroy();
            // ball_num_text.destroy();
            // ball_den_text.destroy();
            // current_score_keeper = 0;
            // current_score_text.destroy();
            // total_score_text.destroy();
            // questions = null;
            // line1.destroy();
        }
    }


    // Check if the basket is correct
    logic_checker(ball_obj, current) {
        let curr = questions.indexOf(current, 0);

        if (ball_obj.y > 475 && ball_obj.x < baskets[curr].x + 60 && ball_obj.x > baskets[curr].x - 60) {
            this.ball_manager(ball_obj);
            total_score_keeper += current_score_keeper;
            current_score_keeper = 100;
            timer -= 50;
            clearInterval(interval);
            interval = setInterval(() => {
                total_score_text.destroy();
                current_score_text.destroy();

                total_score_text = this.add.text(5, 10, 'Total Score: ' + total_score_keeper, {
                    fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
                });

                current_score_text = this.add.text(5, 40, 'Current Score: ' + current_score_keeper, {
                    fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
                });
                current_score_keeper--;
            }, timer);
        }
    }


    ball_manager(ball_obj) {
        ball_obj.destroy();
        ball_num_text.destroy();
        ball_den_text.destroy();
        line1.destroy();

        this.ball_creator();
    }
}