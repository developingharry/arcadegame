// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
// player co-ordinates for collision detection
var playerX;
var playerY;

// win and death counter to go on the scoreboard
var wins = 0;
var deaths = 0;


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.x = -20;
    }
    this.x += this.speed * dt;
    //collision detection part 1 - bug and player occupying same row?
    if (this.y == playerY) {
        // collision detection part 2 - close?
        // first we round up the bug's x-axis position...
        var range = ((Math.round(this.x) - playerX));
        console.log(range);
        //...then see if it's within a reasonable range of the player.
        if (range > -75 && range < 80) {
            //if it is, we reset the player's position (and collision detection position)
            player.x = 200;
            player.y = 390;
            playerX = null;
            playerY = null;
            //...start a new wave
            newWave();
            //add one to the death counter
            deaths++;
            //rather than starting with an empty counter, which is poor form
            //instantiate the counter as soon as it has a value.
            if (deaths == 1) {
                $('.scoreboard').append('Shameful Deaths:<div class = \'deathBox\'></div>');
            }
            //replace death counter value with updated figure.
            $('.deathBox').text(deaths);
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Hero = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//was never very clear what this function was for.  Regardless
//I didn't find I needed it.
Hero.prototype.update = function() {};

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Hero.prototype.handleInput = function(direction) {
    // something in here
    switch (direction) {
        case 'left':
            //mind the left wall
            if (this.x == 0) {
                break;
            }
            this.x -= this.speed;
            playerX = this.x;
            playerY = this.y;
            break;
        case 'right':
            // mind the right wall
            if (this.x == 400) {
                break;
            }
            this.x += this.speed;
            playerX = this.x;
            playerY = this.y;
            break;
        case 'up':
            if (this.y == 50) {
                //gratify the winner if they make it to the water
                alert('You made it!');
                //add 1 to the win counter
                wins++;
                //again, only show the counter once it's needed.
                if (wins == 1) {
                    $('.scoreboard').prepend('Glorious Wins:<div class = \'winBox\'></div>');
                }
                $('.winBox').text(wins);
                //reset the game as before.
                this.x = 200;
                this.y = 390;
                newWave();
                break;
            }
            // speed up and down is reduced to keep the player nicely within
            // the cells of the "game board"
            this.y -= this.speed - 15;
            playerX = this.x;
            playerY = this.y;
            break;
        case 'down':
            if (this.y == 390) {
                break;
            }
            this.y += this.speed - 15;
            playerX = this.x;
            playerY = this.y;
            break;
    }
};

var allEnemies = [];
var player = new Hero(200, 390, 100);

function newWave() {
    allEnemies = [];
    allEnemies.push(new Enemy(-150, 50, 280));
    allEnemies.push(new Enemy(-150, 135, 200));
    allEnemies.push(new Enemy(-150, 50, 100));
    allEnemies.push(new Enemy(-150, 135, 130));
    allEnemies.push(new Enemy(-150, 220, 180));
    allEnemies.push(new Enemy(-150, 220, 50));
}
//first call for a wave of enemies
newWave();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
