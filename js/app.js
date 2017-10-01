// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };
var playerX;
var playerY;
var wins = 0;
var deaths = 0;


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 505) {
      this.x = -20;
    }
    this.x += this.speed * dt;
    //collision detection part 1 - same row?
    if(this.y == playerY) {
      // collision detection part 2 - within nudging distance?
      var range = ((Math.round(this.x)-playerX));
      console.log(range);
      if (range > -75 && range < 80) {
        player.x = 200;
        player.y = 390;
        playerX = null;
        playerY = null;
        newWave();
        deaths++;
        if(deaths==1){
          $('.scoreboard').append('Shameful Deaths:<div class = \'deathBox\'></div>');
        }
        $('.deathBox').text(deaths);
      }
    }
  };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Hero = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  };

Hero.prototype.update = function () {
  };

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

Hero.prototype.handleInput = function (direction) {
    // something in here
    switch (direction) {
      case 'left':
        if (this.x == 0) {
          break;
        }

        this.x -= this.speed;
        playerX = this.x;
        playerY = this.y;
        break;
      case 'right':
        if (this.x == 400) {
          break;
        }

        this.x += this.speed;
        playerX = this.x;
        playerY = this.y;
        break;
      case 'up':
        if (this.y == 50) {
          alert('You made it!');
          wins++;
          if(wins==1){
            $('.scoreboard').prepend('Glorious Wins:<div class = \'winBox\'></div>');
          }
          $('.winBox').text(wins);
          this.x = 200;
          this.y = 390;
          newWave();
          break;
        }

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
      case 'b':
        console.log('x is ' + this.x + ', y is ' + this.y + '.');
    }
  };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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
newWave();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };

    player.handleInput(allowedKeys[e.keyCode]);
  });
