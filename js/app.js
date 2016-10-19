/* Declare variables used across Player and Enemy's methods */
var CELL_W = 101, // This value equals to image width
    CELL_H = 83, // This is trickier; there's vertical overlap. The value 83 comes from render() in Engine
    H_OFFSET = -30; // Determined by trial and error
var TOP_CELL = 0,
    RIGHTMOST_CELL = 4,
    BOTTOM_CELL = 5,
    LEFTMOST_CELL = 0;
var SAFE_DISTANCE = 70;
var baseSpeed = 100;

// Enemies our player must avoid
var Enemy = function(cellY, speed) {
  this.sprite = 'images/enemy-bug.png';
  /* Default initial location + speed provided if not supplied */
  this.setLocation(cellY);
  this.speed = speed || 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.isOffScreen()) {
    this.reincarnate(); // If enemy's fallen off game world, it's reincarnated
  } else {
    this.canvasX += this.speed * dt; // Else, enemy moves horizontally according to speed and time passed
  }
};

/* Return canvasY coordinate of where player should be rendered
 * Mathematically most complicated location function
 * Has to deal with both cell-based and canvas locations
 */
Enemy.prototype.getCanvasX = function() {
  if(this.cellX === LEFTMOST_CELL-1) { // This only happens right after reincarnation
    this.canvasX = -CELL_W;
    this.cellX = 9999;
  }
  return this.canvasX;
};

/* Return canvasY coordinate of where enemy should be rendered */
Enemy.prototype.getCanvasY = function() {
  return H_OFFSET + (this.cellY*CELL_H);
};

/* Set initial location according to given row; horizontally placed one invisble cell to the left */
Enemy.prototype.setLocation = function(cellY) {
  this.cellX = -1;
  this.cellY = cellY || 2;
};

/* Reincarnate at random row and speed calculated based on base speed */
Enemy.prototype.reincarnate = function() {
  this.setLocation(this.getRandomBirthRow());
  this.setRandomSpeed();
};

/* Return a random birth row from three rows available */
Enemy.prototype.getRandomBirthRow = function() {
  return Math.ceil(3*Math.random());
};

/* Set speed randomly by multiplying base speed a number randomly picked from 1 to 5 */
Enemy.prototype.setRandomSpeed = function() {
  this.speed = Math.ceil(5*Math.random()) * baseSpeed;
};

/* Check if enemy has gone off screen by looking at its canvasX */
Enemy.prototype.isOffScreen = function() {
  return (this.getCanvasX() > (RIGHTMOST_CELL+1) * CELL_W) ? true : false;
};

/* Check if enemy has collided with player */
Enemy.prototype.hasCollidedWith = function(player) {
  return ((this.cellY === player.cellY) && (Math.abs(player.getCanvasX()-this.getCanvasX()) < SAFE_DISTANCE)) ? true : false;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
};

var Player = function(cellX, cellY) {
  this.setLocation();
  this.sprite = 'images/char-horn-girl.png';
};

/* Move player when the move doesn't make player falls off the face of the earth */
Player.prototype.update = function(moveX, moveY) {
  moveX = moveX || 0;
  moveY = moveY || 0;
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

/* Return canvasX coordinate of where player should be rendered */
Player.prototype.getCanvasX = function() {
  return this.cellX * CELL_W;
};

/* Return canvasY coordinate of where player should be rendered */
Player.prototype.getCanvasY = function() {
  return H_OFFSET + (this.cellY*CELL_H);
};

/* Set location using cell-based location, not Canvas coordinate */
Player.prototype.setLocation = function(cellX, cellY) {
  this.cellX = cellX || 2;
  this.cellY = cellY || 5;
};

/* Check if player's won by looking if it's in any cell in the top row */
Player.prototype.hasWon = function() {
  return (this.cellY === TOP_CELL) ? true : false;
};

/* Instantiate player and enemies */
var allEnemies = [];
var initialNumEnemies = 3;
for(var i = 0; i < initialNumEnemies; i++) {
  allEnemies[i] = new Enemy(Math.ceil(3*Math.random()), baseSpeed*Math.ceil(5*Math.random()));
}
var player = new Player();

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});