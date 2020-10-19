var movingScene;
var monkey, monkey_running, monkey_collided;
var obstacles1, obstacles2, obstacle1Group, obstacle2Group;
var bananasGroup, bananas;
var road;
var score, survivalTime;
var gamestate="play";

function preload() {
  createCanvas(800, 400);
 monkey_running = loadAnimation("Monkey_01.png",  "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
monkey_collided = loadImage("download.png");

obstacle1 = loadImage("stone.png");
obstacle2 = loadImage("download(1).png"); 
  
bananas = loadImage("banana.png");
  
}

function setup (){
  createCanvas(800,400);
  
  monkey = createSprite(57,282);
  monkey.addAnimation("running",    monkey_running);
  monkey.scale=0.18;

road = createSprite(400,359 ,800,10);
road.velocityX=-4;
road.shapeColor="saddlebrown";
  
bananasGroup = new Group();
obstaclesGroup = new Group();
  
score=0;  
}
function draw() {
  background(220);
  
  if(gamestate==="play"){
    scene.velocityX=-4;
    if(scene.x<0){
    scene.x=scene.width/2;
    }
  if(keyDown("space")&& monkey.y >= 292.6){
    monkey.velocityY = -12 ;
} 

monkey.velocityY = monkey.velocityY + 0.8; 

  
if(road.x<0){
  road.x=road.width/2;
}
 
  
monkey.collide(road);
    
  stroke("black");
textSize(20);
fill("black");
survivalTime=Math.round(World.frameRate);
text("Survival Time: " + survivalTime,100,50);
textFont("GEORGIA");

  spawnBananas();
  spawnObstacles();
  if(bananasGroup.isTouching(monkey)){
       score = score+Math.round(World.frameCount/60);
   bananasGroup.destroyEach();
    
  }
  if(obstacleGroup.isTouching(monkey)){
    gamestate="end";
    
  }
  }
  else if(gamestate==="end"){
    
    monkey.velocityY=0;
    scene.velocityX=0;
    road.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    monkey.setAnimation("collided", monkey_collided);
    monkey.scale=0.3;
    monkey.x=100;
    monkey.y=320;
    
  }
  display();
  textSize(30);
  text("score= "+score,270,50);
}
  function spawnBananas(){
  if(frameCount%100===0){
    banana=createSprite(389,random(120,200));
    banana.setAnimation("banana.png");
    banana.scale=0.1;
    banana.velocityX=-4; 
    
    bananasGroup.add(banana);
  } 
}

function spawnObstacles(){
  if(frameCount%300===0){
  obstacle1=createSprite(400,random(120,150));
    obstacle1.addAnimation("stone.png", obstacle1);
    obstacle1.scale=0.2 ;
    obstacle1.velocityX=-4;
    
    obstacle1Group.add(obstacles1);
  }
  
function spwanObstacles2(){
  if(frameCount%400===0){
    obstacle2=createSprite(400,random(330,350));
    obstacles2.addAnimation("obstacle", obstacle2);
    obstacles2.scale=0.3;
    obstacles2.velocityX=-4;
    
    obstacle2Group.add(obsatcles2);
  }
}  
}