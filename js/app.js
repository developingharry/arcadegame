// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    // something in here
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
        break;
      case 'right':
        if (this.x == 400) {
          break;
        }

        this.x += this.speed;
        break;
      case 'up':
        if (this.y == 50) {
          alert('winning');
          break;
        }

        this.y -= this.speed - 15;
        break;
      case 'down':
        if (this.y == 390) {
          break;
        }

        this.y += this.speed - 15;
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // just for debugging position
        66: 'b',
      };

    player.handleInput(allowedKeys[e.keyCode]);
  });
