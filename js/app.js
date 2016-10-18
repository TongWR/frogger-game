// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Declare variables used across Player's methods */
var CELL_W = 101; // This value equals to image width
var CELL_H = 83; // This is trickier; there's vertical overlap. The value 83 comes from render() in Engine
var H_OFFSET = -30; // Determined by trial and error

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.setCanvasCoordinate(2, 5);
};

Player.prototype = function() {

};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      this.x -= CELL_W;
      break;
    case 'up':
      this.y -= CELL_H;
      break;
    case 'right':
      this.x += CELL_W;
      break;
    case 'down':
      this.y += CELL_H;
      break;
    default:
      // Should never happen
      console.log(key);
  }
};

Player.prototype.setCanvasCoordinate = function(cellX, cellY) {
  this.x = cellX * CELL_W;
  this.y = (cellY*CELL_H) + H_OFFSET;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
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