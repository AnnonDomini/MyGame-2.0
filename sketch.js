var bg,bgImg;
var player, shooterImg, shooter_shooting;
var playerMoving;
var zombie;
var gameState;
var enemy;
var health;
var healthBar, h1, h2, h3;


function preload(){
  gameState= "Play"
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  playerMoving = loadAnimation("assets/walk_knight_1.png","assets/walk_knight_2.png","assets/walk_knight_3.png","assets/walk_knight_4.png","assets/walk_knight_5.png","assets/walk_knight_6.png","assets/walk_knight_7.png","assets/walk_knight_8.png"
,"assets/walk_knight_9.png","assets/walk_knight_10.png","assets/walk_knight_11.png","assets/walk_knight_12.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombie = loadImage("assets/zombie.png")
  h1 = loadImage("assets/heart_1.png")
  h2 = loadImage("assets/heart_2.png")
  h3 = loadImage("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
//creating health system
healthBar = createSprite(width/2+500,height/2-300)
healthBar.scale = 1.2
health = 3
healthBar.addImage(h3)

  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addAnimation("moving",playerMoving)
   player.scale = 3
   player.debug = true
   player.setCollider("rectangle",0,0,10,10)
   


}

function draw() {
  background(0); 
  if(gameState === "Play"){

  
  spawnEnemy();



  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+30
  }
  
 }

 if(gameState === "End"){
  player.destroy()
 }
 drawSprites();


}
function spawnEnemy(){
  if(frameCount%100===0){
  enemy = createSprite(width/2,height/2);
  enemy.x = Math.round(random(500,1200))
  enemy.y = Math.round(random(100,600))
  enemy.addImage(zombie);
  enemy.velocityX = -3
  enemy.scale = 0.5
  
  }

  /*matter.Events.on(engine, 'collisionStart', function(event) {
    // We know there was a collision so fetch involved elements ...
    var aElm = document.getElementById(event.pairs[0].bodyA.elementId);
    var bElm = document.getElementById(event.pairs[0].bodyB.elementId);
    // Now do something with the event and elements ... your task ;-)
    handlePlayerCollision()
  });*/
  
}
function handlePlayerCollision(){
  if(keyDown === SPACE){
    enemy.destroy()
  }
  else{
    updtePlayerHealth(-1)
  }
}
function updtePlayerHealth(amount){
  health += amount
  healthBar.addImage("h"+health)
  if(health === 0){
    gameState = "End"
  }
                                        
}