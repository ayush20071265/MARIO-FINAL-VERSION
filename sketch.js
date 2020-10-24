var mario;
var background;
var groundImage;
var brickImage;
var cactusImage;
var cactusGroup;
var bricksGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var collidedImage;
var score = 0;
var gameOverImage;
var restartImage;

function preload(){
   backgroundImage = loadImage("bg.png");
  
   marioImage = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  
  groundImage = loadImage("ground2.png");
  
  brickImage = loadImage("brick.png");
  
 cactusImage =  loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  
  collidedImage = loadAnimation("collided.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 350);
  
  mario = createSprite(40,268,25,25);
  mario.addAnimation("Mimage",marioImage);
  mario.scale = 1.8;
  
  ground = createSprite(200,330,400,20);
  ground.addImage("ground!",groundImage);
  
  
  bricksGroup = new Group();
  cactusGroup = new Group();
  
  mario.setCollider("circle",0,0,15);
  
  gameOver = createSprite(300,160,20,20);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,200,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.6;
}

function draw() {
  background(backgroundImage);
  fill("Black");
  text("Score:" + score,540,50);
  
  if(gameState === PLAY) {
        gameOver.visible = false;
        restart.visible = false;
    
        ground.velocityX = -2;
        if(keyDown("space") && mario.y >= 255.8) {
          mario.velocityY = -8;
        }
        mario.velocityY = mario.velocityY + 0.5;

        if(ground.x < 0) {
          ground.x = ground.width/2;
        }
        spawnBricks();
  
        spawnObstacles();
        
        for(var i = 0; i < bricksGroup.length; i++) {
            if(bricksGroup.get(i).isTouching(mario)) {
               bricksGroup.get(i).remove();
               score = score + 1;
             }
        }
        
        if(mario.isTouching(cactusGroup)) {
          gameState = END;
        }
    
        
  } else if(gameState === END) {
      ground.velocityX = 0;
      mario.velocityY = 0;
    
      bricksGroup.setVelocityXEach(0);
      cactusGroup.setVelocityXEach(0);
    
      bricksGroup.setLifetimeEach(-1);
      cactusGroup.setLifetimeEach(-1);
    
      mario.addAnimation("Mimage",collidedImage);
      gameOver.visible = true;
      restart.visible = true;
    
      if(mousePressedOver(restart)) {
        reset();
      }
  }
  
  mario.collide(ground);
  
  drawSprites();
}

function spawnBricks() {

 if(frameCount % 30 == 0) {
    var brick = createSprite(600,200,20,20);
    brick.addImage(brickImage);
    brick.velocityX = -5; 
    brick.y = Math.round(random(190,120));
    mario.depth = brick.depth + 1;
    brick.lifetime = 200;
    bricksGroup.add(brick);
  }

}

function spawnObstacles() {
  if(frameCount % 60 == 0) {
    var obs = createSprite(600,270,20,20);
    obs.addAnimation("obs",cactusImage);
    obs.velocityX = -5;
    obs.lifetime = 200;
    cactusGroup.add(obs);
  }
}

function reset() {
  gameOver.visible = false;
  restart.visible = false;
  gameState = PLAY;
  score = 0;
  bricksGroup.destroyEach();
  cactusGroup.destroyEach();
  mario.addAnimation("Mimage",marioImage);
}