
var bg,bgImage,restartImage,youLostImage
var ground,monkey,bananas,rocks,monkeyColli
var boa,boaImage
var monkeyImage
var bananaGroup
var rockGroup
var PLAY=1
var END=0
var gameState=1
var score=0
var survivalTime=0
function preload(){
  
  monkeyImage=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 bgImage=loadImage("download.jpeg")
  bananaImage=loadImage("banana.png")
rocksImage=loadImage("obstacle.png")
boaImage=loadImage("board.jpeg")
  chewSound=loadSound("Bubble-Gum-Pop-A-www.fesliyanstudios.com.mp3")
  loseSound=loadSound("You-lose-sound-effect.mp3")
  restartImage=loadImage("images.png")
  youLostImage=loadImage("LOST.png")
  monkeyColli=loadImage("sprite_0.png")
}

function setup(){
  createCanvas(600,300)
  var message = "This is a message";
 console.log(message)
  bg=createSprite(300,100)
  bg.addImage("bg",bgImage)
  bg.scale=2.4

  bg.x=bg.width/2
  ground=createSprite(400,300,900,10)
  ground.velocityX=-5
  
  ground.x=ground.width/2
  monkey=createSprite(50,300,10,10)
  monkey.addAnimation("monkey",monkeyImage)
  monkey.scale=0.1
  monkey2=createSprite(50,300,10,10)
  monkey2.addAnimation("monkey2",monkeyColli)
  monkey2.scale=0.1
  boa=createSprite(529,50)
  boa.addImage("boa",boaImage)
  boa.scale=0.8
restart=createSprite(300,150)
  restart.addImage(restartImage)
  lost=createSprite(280,50)
  lost.addImage(youLostImage)
  lost.scale=2
  bananaGroup= createGroup();
 

  rockGroup=createGroup();
}

function draw(){
  background("white")

  if (gameState===PLAY){
    survivalTime=Math.ceil(frameCount/frameRate()) 
   restart.visible=false
    lost.visible=false
   monkey2.visible=false
    monkey.visible=true
    if(ground.x<250){
    ground.x=ground.width/2
  }
  ground.visible=false
  monkey.collide(ground)
    if(keyDown("space")&&monkey.y>=180){
      monkey.velocityY=-12
    }
    monkey.velocityY=monkey.velocityY+0.8
    bg.velocityX=-2
    if(bg.x<250){
      bg.x=bg.width/1
    }
    
   if(bananaGroup.isTouching(monkey)) {
     bananaGroup.destroyEach();
     chewSound.play();
     score=score+1
   }
    
      spawnObstacles()
  spawnBananas()
    
    if(rockGroup.isTouching(monkey)){
      gameState=END
      loseSound.play()
    
      
    }
    
 
  }
  
 else if (gameState===END){
   frameCount=0
   restart.visible=true
    lost.visible=true
  
    monkey2.visible=true
   monkey.visible=false
   monkey2.collide(ground)
    if(mousePressedOver(restart)){
      reset();
    }
   monkey.collide(ground)
 bg.velocityX=0
  
monkey.velocityY=0
   monkey.changeAnimation("monkey2",monkeyColli)
   rockGroup.setVelocityXEach(0)
bananaGroup.setVelocityXEach(0)
       rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);


   

 } 
  
  
  
  
  
  
  

  drawSprites();
  stroke("yellow")
  strokeWeight(0.6)
  fill("yellow")
  textSize(15)
  text("Score : "+score,470,30)
  stroke("blue")
  strokeWeight(0.6)
  fill("cyan")
  textSize(16)

  text("SurvivalTime = "+survivalTime,465,60)
}

function reset(){
  
  gameState=PLAY
  rockGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0

}






function spawnBananas(){
  if(frameCount%60===0){
  bananas=createSprite(200,100,10,10) 
  bananas.addImage(bananaImage)  
  bananas.scale=0.1  
    bananas.y=Math.round(random(120,200))
    bananas.velocityX=-4
    bananas.setLifetime=120
    bananaGroup.add(bananas)
  }
  
  
}

function spawnObstacles(){
  if(frameCount%60===0){
    rocks=createSprite(Math.round(random(100,600)),280)
    rocks.addImage(rocksImage)
    rocks.scale=0.1
    rocks.velocityX=-(11 +(survivalTime/10 ))
    rocks.setLifetime=120
    rockGroup.add(rocks)
  }
}

