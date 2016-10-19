/* Declare variables used across Player and Enemy's methods */
var CELL_W = 101, // This value equals to image width
    CELL_H = 83, // This is trickier; there's vertical overlap. The value 83 comes from render() in Engine
    H_OFFSET = -30; // Determined by trial and error
var TOP_CELL = 0,
    RIGHTMOST_CELL = 4,
    BOTTOM_CELL = 5,
    LEFTMOST_CELL = 0;
var SAFE_DISTANCE = 70;

// Enemies our player must avoid
var Enemy = function(cellY, speed) {
  this.sprite = 'images/enemy-bug.png';

  // Default initial location + speed provided if not supplied
  this.setLocation(cellY);
  this.speed = speed || 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if(this.isOffScreen()) {
    this.reincarnate();
  } else {
    this.canvasX += this.speed * dt;
  }
};

Enemy.prototype.getCanvasX = function() {
  if(this.cellX === LEFTMOST_CELL-1) {
    this.canvasX = -CELL_W;
    this.cellX = 9999;
  }
  return this.canvasX;
};

Enemy.prototype.getCanvasY = function() {
  return H_OFFSET + (this.cellY*CELL_H);
};

Enemy.prototype.setLocation = function(cellY) {
  this.cellX = -1;
  this.cellY = cellY || 2;
};

Enemy.prototype.reincarnate = function() {
  this.setLocation(this.getRandomBirthRow());
  this.setRandomSpeed();
};

Enemy.prototype.getRandomBirthRow = function() {
  return Math.ceil(3*Math.random());
};

Enemy.prototype.setRandomSpeed = function(baseSpeed) {
  var baseSpeed = baseSpeed || 100;
  this.speed = Math.ceil(5*Math.random()) * baseSpeed;
};

Enemy.prototype.isOffScreen = function() {
  return (this.getCanvasX() > (RIGHTMOST_CELL+1) * CELL_W) ? true : false;
};

Enemy.prototype.hasCollidedWith = function(player) {
  return ((this.cellY === player.cellY) && (Math.abs(player.getCanvasX()-this.getCanvasX()) < SAFE_DISTANCE)) ? true : false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(cellX, cellY) {
  this.setLocation();
  this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(moveX, moveY) {
  var moveX = moveX || 0;
  var moveY = moveY || 0;
  if(moveX === -1 && this.cellX > LEFTMOST_CELL) this.cellX--;
  if(moveX === 1 && this.cellX < RIGHTMOST_CELL) this.cellX++;
  if(moveY === -1 && this.cellY > TOP_CELL) this.cellY--;
  if(moveY === 1 && this.cellY < BOTTOM_CELL) this.cellY++;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      this.update(-1, 0);
      break;
    case 'up':
      this.update(0, -1);
      break;
    case 'right':
      this.update(1, 0);
      break;
    case 'down':
      this.update(0, 1);
      break;
  }
};

Player.prototype.getCanvasX = function() {
  return this.cellX * CELL_W;
};

Player.prototype.getCanvasY = function() {
  return H_OFFSET + (this.cellY*CELL_H);
};

// Default to initial location
Player.prototype.setLocation = function(cellX, cellY) {
  this.cellX = cellX || 2;
  this.cellY = cellY || 5;
};

Player.prototype.hasWon = function() {
  return (this.cellY === TOP_CELL) ? true : false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numEnemies = 5;
for(var i = 0; i < 5; i++) {
  allEnemies[i] = new Enemy(Math.ceil(3*Math.random()), 100*Math.ceil(5*Math.random()));
}
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