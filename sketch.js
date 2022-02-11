var player, playerAnimation
var invisibleGround, invisibleCeiling
var obstacle1, obstacle2, obstacle3;
var backgroundImage, gameOverImg;
var score;
var PLAY=1;
var END=0;

var gameState=PLAY;

function preload(){


  playerAnimation=loadAnimation("personA.png","personB.png","personC.png")
  backgroundImage=loadImage("background.jpg")
  obstacle1=loadImage("bossy.png")
  obstacle2=loadImage("nomoney.png")
  obstacle3=loadImage("robber.png")
  gameOverImg=loadImage("GAMEOVER.png")
  
  }
function setup() {
  createCanvas(800,400);
 player=createSprite(50,300)
 player.addAnimation('player',playerAnimation)
 player.scale=1.5

 invisibleGround=createSprite(400,380,800,10)
 invisibleGround.visible=true
 invisibleCeiling=createSprite(400,70,800,0.01)

obstacleGroup = createGroup()

gameOver=createSprite(400,200)
gameOver.addImage(gameOverImg)
player.setCollider("rectangle",0,0,30,100);
  player.debug = true
  
  score = 0;
}

function draw() {
  background(backgroundImage)
  text("Score: "+ score, 500,50);  
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

  if(keyDown(UP_ARROW)){
    player.velocityY=-10
  }

  player.velocityY+=1

  if(keyDown(RIGHT_ARROW)){
    player.x+=1
  }
  spawnObstacles()
  gameOver.visible=false
    if(obstacleGroup.isTouching(player)){ 
      gameState = END;
    }
  }
  else if(gameState===END){
    obstacleGroup.setLifetimeEach(-1);
    player.velocityY=0;
    obstacleGroup.setVelocityXEach(0)
    gameOver.visible=true
  }
player.collide(invisibleGround)

drawSprites();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(760,345,200,100);
    obstacle.velocityX = -(6);
    obstacle.debug=true

    obstacle.setCollider("circle",0,0,30);
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       default: break;
     } 
  
  obstacle.scale = 0.5;
  obstacle.lifetime = 300;

  obstacleGroup.add(obstacle);
    }
}
