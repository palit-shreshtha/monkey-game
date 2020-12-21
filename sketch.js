// declaring variables 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score,survivalTime;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var bananaScore;
var survivalTime=0;
function preload(){
  // loading images and animations
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  // creating canvas
  createCanvas (400,400);
  
  // creating sprite objects
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;
  console.log(ground.x);
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  bananaScore=0;
  score=0;
 }


function draw() {
  // background
 background("lightBlue");
  
  // conditional programming
    if(gameState === PLAY){
    score = score + Math.round(frameCount/60);
    //move the ground
    ground.velocityX = -4;
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
 
    if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -13;
    
  }
  // adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
    }
  food();
  obstacles();
    
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     bananaScore=bananaScore+1;
   }
    if(obstacleGroup.isTouching (monkey)){
    gameState=END;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    }
  
else if(gameState === END){
  ground.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Game Over",150,200);
  stroke("green");
  textSize(15);
  fill("green");
  text("Press R to restart",150,250);
  if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      survivalTime=0;
      bananaScore= 0;
      gameState = PLAY; 
    }
}
// displaying texts 
stroke("white");
textSize(20);
fill("white"); 
text("Score:"+bananaScore,300,50);
    
stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,20,50);
    
// making monkey collide with the ground
monkey.collide(ground);
  
// drawing sorites
drawSprites();

}

// self designed functions
function food(){
  if (frameCount%80 === 0){
    banana = createSprite(200,40,20,20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-5  
    banana.y=Math.round(random(120,200));
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
}
 function obstacles(){
   
   if (frameCount%300===0){
     obstacle=createSprite(200,330,20,20)
     obstacle.addImage("stone",obstacleImage);
     obstacle.velocityX=-3;
     obstacle.lifeTime=131;
     obstacle.scale=0.1;
     obstacleGroup.add(obstacle);
     obstacle.debug=true;
     obstacle.setCollider("circle",0,0,180);
     
   }
 } 
 
