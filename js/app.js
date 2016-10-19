/* Declare variables used across Player and Enemy's methods */
var CELL_W = 101; // This value equals to image width
var CELL_H = 83; // This is trickier; there's vertical overlap. The value 83 comes from render() in Engine
var H_OFFSET = -30; // Determined by trial and error

// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
  this.sprite = 'images/enemy-bug.png';

  // Default initial location + speed provided if not supplied
  this.x = initialX || -CELL_W;
  this.y = initialY || (2*CELL_H + H_OFFSET);
  this.speed = speed || 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if(this.isOffScreen()) {
    this.x = -CELL_W;
  } else {
    this.x += this.speed * dt;
  }
};

Enemy.prototype.isOffScreen = function() {
  return (this.x > 5*CELL_W) ? true : false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.setCanvasCoordinate(2, 5);
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      if(this.x === 0) {
        // At leftmost cell, cannot move left; do nothing.
      } else {
        this.x -= CELL_W;
      }
      break;
    case 'up':
      if(this.y === H_OFFSET) {
        // At top cell, cannot move up; do nothing.
      } else {
        this.y -= CELL_H;
      }
      break;
    case 'right':
      if(this.x === 4*CELL_W) {
        // At rightmost cell, cannot move right; do nothing.
      } else {
        this.x += CELL_W;
      }
      break;
    case 'down':
      if(this.y === 5*CELL_H + H_OFFSET) {
        // At bottom cell, cannot move down; do nothing.
      } else {
        this.y += CELL_H;
      }
      break;
  }
};

Player.prototype.setCanvasCoordinate = function(cellX, cellY) {
  this.x = cellX * CELL_W;
  this.y = (cellY*CELL_H) + H_OFFSET;
};

Player.prototype.hasWon = function() {
  return (this.y === -H_OFFSET) ? true : false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy();
allEnemies[1] = new Enemy(-CELL_W, CELL_H + H_OFFSET, 500);
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});