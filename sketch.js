var PLAY = 1;
var END = 0;
var gameState = PLAY

var carImage, roadImage, rdBlockImage
var rdBlockGroup
var car, road , roadBlock
var invisBoundary1,invisBoundary2
var distance = 0
function preload(){

carImage=loadImage("car.png")
roadImage=loadImage("road.png")
rdBlockImage=loadImage("roadblock.png")

}

function setup() {
createCanvas(900,600);

road = createSprite(400,270,900,300);
road.addImage(roadImage);
road.scale = 5
road.velocityX = -5

car = createSprite(70,300)
car.addImage(carImage);
car.scale = 0.3

invisBoundary1 = createSprite(300,530,900,50)
invisBoundary1.visible = false

invisBoundary2 = createSprite(450,60,900,50)
invisBoundary2.visible = false

rdBlockGroup = createGroup();

}

function draw(){ 
background(180)

drawSprites()
textSize(20);
  fill(255);
  text("Distance: "+ distance,750,60,);

if(gameState === PLAY){
if (road.x < 225){
    road.x = road.width/0.9;
  }
  distance = distance + Math.round(getFrameRate()/50);
  road.velocityX = -(6 + 2*distance/150);

  car.collide(invisBoundary1)
  car.collide(invisBoundary2)
  
  car.y=World.mouseY;

  
  if (World.frameCount % 115 == 0) {
     
      spawn_rdBlock();
    }
   
  if(car.collide(rdBlockGroup)){
    gameState = END
  }  
}
if(gameState === END){
  text("Press Up Arrow to Restart the Game",500,300)
  road.velocityX = 0
  car.velocityY = 0 
  car.velocityX =0
  rdBlockGroup.setVelocityXEach(0);
  
  rdBlockGroup.setLifetimeEach(-1);

  if(keyDown("up")){
    reset()
    }


}
    
    
  





 
}

function spawn_rdBlock(){
  roadBlock = createSprite(920,Math.round(random(70,520)))
  roadBlock.addImage(rdBlockImage)
  roadBlock.velocityX = road.velocityX
  roadBlock.scale = 0.3
  roadBlock.lifetime = 200
  rdBlockGroup.add(roadBlock)
}

function reset(){
  gameState = PLAY
  distance = 0

rdBlockGroup.destroyEach();
}