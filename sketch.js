var monkey,bananaImage, monkeyImage, obstacleImage, bgroundImage, bground, ground;
var obstacleImage;
var ObstaclesGroup;
var BananaGroup;
var banana;
var ground;
 var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload()
{ 
      bgroundImage = loadImage("jungle.jpg")
      monkeyImage =  loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png","m9.png","mon10.png");
  
      bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() 
{
   createCanvas(400, 400);
   //background("white");
   
   bground = createSprite(0,0,400,400);
   bground.addImage(bgroundImage);
 
   score = 0;
   monkey = createSprite(150,150,40);
   monkey.addAnimation("monkeyRunning", monkeyImage);
   monkey.scale = 0.1;
  
   ground = createSprite(300,300,800,10);
  
        ObstaclesGroup = new Group();
        BananaGroup =  new Group();
}

function draw() 
  {
    background(180);
    if(gameState === PLAY)
     {
    //score = score + Math.round(getFrameRate()/60);
    ground.visible = false;
    bground.velocityX = -(2+score/10);
    monkey.velocityY = monkey.velocityY + 0.5
        
    if(keyDown("space") && monkey.y >= 216) 
    {  
      monkey.velocityY = -10;
    }
  
  
  if (bground.x < 0)
    {
      bground.x = bground.width/2;
    }
  if(BananaGroup.isTouching(monkey)){
 BananaGroup.destroyEach();
    score += 10
    console.log(score);
  switch(score){
      case 10:monkey.scale=0.20;
      break;
      case 20:monkey.scale=0.30;
      break;
      case 30:monkey.scale=0.40;
      break;
      case 40:monkey.scale=0.60 ;  
      break;
      default:break;
  }
 }
    if(ObstaclesGroup.isTouching(monkey)){
      ObstaclesGroup.destroyEach();
      monkey.scale -= 0.05;
    }
  Banana();
  Obstacles();
   
  monkey.collide(ground);
       
    if(monkey.scale <= 0 ){
      gameState = END;
    }
  }
  
  if(gameState === END){
    monkey.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    bground.velocityX = 0;
  monkey.velocityY = 0;
  }
 
    stroke("white")
    textSize(20);
    fill("black")
   text("Score: "+ score, 100,150);
  drawSprites();
}


function Banana() {
  if (frameCount % 80 === 0) {
   banana = createSprite(250,random(150,200),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
    banana.lifetime = 150;
    
    
    
    BananaGroup.add(banana);
  }
  
}
    
function Obstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(250,280,40);
    obstacle.velocityX = -(4+score/100);
    obstacle.addImage(obstacleImage);
     
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    
    ObstaclesGroup.add(obstacle);
  }
}
