var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var mlaneGroup, mlane;

function preload() {
  track = loadImage("track.jpg");
  // car1_img = loadImage("car1.png");
  // car2_img = loadImage("car2.png");
  // car3_img = loadImage("car3.png");
  // car4_img = loadImage("car4.png");
  car1_img = loadImage("images/blue-bike.png");
  car2_img = loadImage("images/motorbike_red.png");
  car3_img = loadImage("images/motorbike.png");
  car4_img = loadImage("images/orange_bike.png");
  ground = loadImage("ground.png");
  bike1_img = loadImage("images/bike1.png");
  audi_img = loadImage("images/audi.png");
  rolls_img = loadImage("images/rolls.png");
  crash_img = loadImage("images/crash.png");
  bmw_img = loadImage("images/bmw.png");
  truck_img = loadImage("images/truck.png");
  sound = loadSound("images/sound1.mp3");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  bike1_img.scale = 0.5;
  audi_img.scale = 0.5;
  rolls_img.scale = 0.5;

  mlaneGroup = new Group();
}

function draw() {
  if (playerCount === 4) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
    //sound.play();
  }
  if (gameState === 2) {
    game.end();
  }
  if (playerCount === 4 && player.rank === 4) {
    textSize(30);
    text("Press RESET button", displayWidth - 400, 50);
  }
}
