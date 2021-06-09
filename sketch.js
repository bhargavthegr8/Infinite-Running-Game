var PLAY = 1;
var END = 0;
var INTRO =2;
var Y=1;
var X=0;
var yo=Y;
var gameState = INTRO;
var rand;
var obstacle;
var player, playerAnimation, player_collided,playerDead;
var foreground, backbg, farbg, invisiblebackground, bg1,bg2,bg3;
var player_jumping, jumpSound;
var v1, v2,v3, v4;
var cloudsGroup, cloudImage;
var obstaclesGroup,vehiclesGroup, fireball, mine, snakes, obstacle4, obstacle5, obstacle6;
var mineExplosion
var survivalTime=0;
var gameOverImg,restartImg;
var beam, explosion, hurt, bgSound;
var onImg, offImg, sound;
var U = 1;
var V = 2;
var n=U;
var touches;
var playerIdle, PenterImg, controlImg, creditsImg, cityImg, Penter, control, credits,city;
var button, button2;
localStorage["HighestScore"]=0;

function preload(){
  bgSound = loadSound("sounds/sci_fi_platformer02.ogg");
  playerAnimation = loadAnimation("player/run/run-1.png","player/run/run-2.png","player/run/run-3.png","player/run/run-4.png","player/run/run-5.png","player/run/run-6.png","player/run/run-7.png","player/run/run-8.png");
  player_collided = loadAnimation("explosion/enemy-explosion-1.png","explosion/enemy-explosion-2.png","explosion/enemy-explosion-3.png","explosion/enemy-explosion-4.png","explosion/enemy-explosion-5.png","explosion/enemy-explosion-6.png");
  player_jumping = loadAnimation("player/jump/jump-1.png","player/jump/jump-2.png","player/jump/jump-3.png","player/jump/jump-4.png","player/jump/jump-1.png")
  playerDead = loadAnimation("player/hurt/hurt.png");
  playerIdle = loadAnimation("player/idle/idle-1.png", "player/idle/idle-2.png", "player/idle/idle-3.png", "player/idle/idle-4.png")
  
  PenterImg = loadAnimation("enter.png");
  controlImg= loadImage("control.png");
  creditsImg = loadImage("credits.png");
  cityImg = loadImage("title.png");
  
  bg1 = loadImage("layers/foreground.png");
  bg2 = loadImage("layers/back-buildings.png");
  bg3 = loadImage("layers/far-buildings.png");

  v1= loadAnimation("vehicles/v-police.png");
  v2 = loadAnimation("vehicles/v-red.png");
  v3 = loadAnimation("vehicles/v-truck.png");
  v4 = loadAnimation("vehicles/v-yellow.png");

  onImg = loadAnimation("soundOn.png");
  offImg = loadAnimation("soundOff.png");

  mineExplosion = loadAnimation("mine/explosion_1.png", "mine/explosion_2.png", "mine/explosion_3.png", "mine/explosion_4.png", "mine/explosion_5.png", "mine/explosion_6.png", "mine/explosion_7.png")
  fireball = loadAnimation("fireball/fireball_1.png","fireball/fireball_2.png","fireball/fireball_3.png","fireball/fireball_4.png","fireball/fireball_5.png");
  mine = loadAnimation("mine/mine_1.png","mine/mine_2.png");
  snakes = loadAnimation("snakes/appear-disappear/appear_1.png","snakes/appear-disappear/appear_2.png","snakes/appear-disappear/appear_3.png","snakes/appear-disappear/appear_4.png","snakes/appear-disappear/appear_5.png","snakes/appear-disappear/appear_5.png","snakes/appear-disappear/appear_5.png","snakes/appear-disappear/appear_5.png","snakes/appear-disappear/appear_5.png","snakes/appear-disappear/appear_4.png","snakes/appear-disappear/appear_3.png","snakes/appear-disappear/appear_2.png","snakes/appear-disappear/appear_1.png");
  snakeCollided = loadAnimation("snakes/appear-disappear/appear_5.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  gameO = loadSound("gameover.wav");
  jumpSound = loadSound("jump.wav")
  explosion = loadSound("sounds/explosion.ogg");
  hurt = loadSound("die.mp3");
}

function setup() {
  createCanvas(576,288);

  bgSound.loop();
  player_jumping.frameDelay = 3;

  farbg = createSprite(288,144,1152,288);
  farbg.addImage("background3",bg3);
  farbg.scale=1.5;

  backbg = createSprite(288,144,1536,288);
  backbg.addImage("background2",bg2);
  backbg.scale=1.5;
  
  foreground = createSprite(288,144,1584,288);
  foreground.addImage("background",bg1);
  foreground.scale=1.5;
  
  gameOver = createSprite(288,144,400,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(288,200);
  restart.addImage(restartImg);
  restart.scale =0.15;

  invisiblebackground = createSprite(304,270,912,10);
  invisiblebackground.visible = false;

  player = createSprite(30,230,20,50);
  player.addAnimation("idle", playerIdle)
  player.addAnimation("running", playerAnimation);
  player.addAnimation("jumping",player_jumping);
  player.addAnimation("collided", player_collided);
  player.addAnimation("dead", playerDead);
  player.scale = 1.5;

  control = createSprite(288,100);
  control.addImage(controlImg);
  control.scale= 1.5;
  control.visible = false;
  
  Penter = createSprite(288,210);
  Penter.addAnimation("Penter",PenterImg);
  Penter.scale= 1.7;
  Penter.visible =false;

  city = createSprite(288,140);
  city.addImage(cityImg);
  city.scale= 1.5;

  credits = createSprite(288,270);
  credits.addImage(creditsImg);
  credits.scale= 0.6;
  
  obstaclesGroup = createGroup();
  vehiclesGroup = createGroup();
  
  player.setCollider("rectangle",0,0,player.width-30,player.height);
  //foreground.debug = true;
  score = 0;
  button = createImg("soundOn.png");
  button.size(30,30)
  button.position(16,251);
  button.mousePressed(togglePlaying);
  button2 = createImg("soundOff.png");
  button2.size(30,30)
  button2.position(16,251);
  button2.hide();
  button2.mousePressed(togglePlaying);
}

function draw() {
  
  if (gameState === INTRO){
    gameOver.visible = false;
    restart.visible = false;
    if(frameCount%20===0){
      Penter.visible =true;
    }
    if(frameCount%40===0){
      Penter.visible= false;
    }
    if(keyCode === 13){
      city.visible = false;
    }
    
    if(keyCode === 13 && control.visible===false){
      Penter.visible =false;
      credits.visible =false;
      gameState = PLAY;
    }


  } else if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    player.velocityX = 6;
    survivalTime=survivalTime+ Math.round(getFrameRate()/60);

    if(player.x>140){
      player.velocityX =0;
      farbg.velocityX =-3;
      backbg.velocityX = -4;
      foreground.velocityX = -6;
      spawnObstacles();
    }

    if(backbg.x <= 0){
      backbg.x = backbg.width/2.68;
    }
    
    if (foreground.x <= 0){
      foreground.x = foreground.width/2;
    }
  
    if(farbg.x <= 0){
      farbg.x = farbg.width/2;
    }

    if(player.y>=213){
      player.changeAnimation("running");
      player.setCollider("rectangle",0,0,player.width-60,player.height-30);
    }
    
    //jump when the space key is pressed
    if(touches.length > 0 || keyDown("space") && player.y>=212) {
      player.changeAnimation("jumping",player_jumping)
      player.setCollider("rectangle",0,0,player.width-70,player.height-60);
      player.velocityY = -12;
      touches=[];
      if(!jumpSound.isPlaying()){
        jumpSound.setVolume(1);
        jumpSound.play();
      }
    } 
    
    //add gravity
    player.velocityY = player.velocityY + 0.8
  
    //spawn obstacles on the background
    spawnVehicles();
    
    if(obstaclesGroup.isTouching(player)){
      if(rand !==3){
        player.changeAnimation("collided", player_collided);
        obstaclesGroup.destroyEach(),
        explosion.play();
      }else{
        hurt.setVolume(0.3);
        hurt.play();
        player.changeAnimation("dead", playerDead);
        obstaclesGroup.destroyEach();
      }
      gameState = END;
    }
  }

   else if (gameState === END) {
    if(!explosion.isPlaying()&& rand!==3){
      player.visible = false;
    }
    if(!explosion.isPlaying() && !hurt.isPlaying() && frameCount % 40=== 0 && yo===Y){
      bgSound.stop();
      gameOver.visible = true;
      gameO.play();
      yo=X
    }
  
    if(gameOver.y >70 && gameOver.visible === true && !gameO.isPlaying()){
      gameOver.velocityY = -3;
    }else{
      gameOver.velocityY = 0;
    }
    if(gameOver.y <=70){
      restart.visible = true;
    }
     
     //change the player animation
      //player.changeAnimation("collided", player_collided);
    
      foreground.velocityX = 0;
      backbg.velocityX= 0;
      farbg.velocityX = 0;
      player.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     
     //when the restart sprite is pressed
      if(mousePressedOver(restart)) {
        reset();
      }
   }
   if(localStorage["HighestScore"]<survivalTime){
    localStorage["HighestScore"] = survivalTime;
  }
 
  player.collide(invisiblebackground);

  drawSprites();
  textSize(15);
  fill(255,201,14);
  textFont("Rockwell Condensed");
  text("Survival Time : "+survivalTime,10,30);
  text("High Score-: "+localStorage["HighestScore"],10,15);
}

//functon to start everything from beginning
function reset(){
  yo=Y;
  gameOver.y =144;
  score=0;
  survivalTime=0;

  gameState = PLAY;
 
  restart.visible = false;
  gameOver.visible = false;

  obstaclesGroup.destroyEach();
  player.changeAnimation("running", playerAnimation);
  player.visible = true;
  player.x=0;
  if(!bgSound.isPlaying()){
    bgSound.play();
  }
}


function spawnObstacles(){

 if (frameCount % 100 === 0){
  obstacle = createSprite(random(580,800),250,10,40);
    //generate random obstacles
    rand = Math.round(random(1,3));
    snakes.frameDelay =10;
    if(rand===1){
      obstacle.y = 220;
      obstacle.velocityX = -12;
      obstacle.lifetime = 66;
    } else{
      obstacle.velocityX = -6;
      obstacle.lifetime = 138;
    }
    if(rand===3){
      obstacle.setCollider("circle",0,0,obstacle.width-30);
      obstacle.x =580;
      obstacle.lifetime = 138;
    }
    
    switch(rand) {
      case 1: obstacle.addAnimation("fireball",fireball);
              break;
      case 2: obstacle.addAnimation("mine",mine);
              break;
      case 3: obstacle.addAnimation("snakes",snakes);
              obstacle.addAnimation("collided", snakeCollided)
              break;
      default: break;
    }          
    obstacle.scale = 0.2;
    //obstacle.debug = true;

    obstaclesGroup.add(obstacle);
 }
}

function spawnVehicles(){
  if(frameCount %60===0){
    var vehicle = createSprite(586,70,400);
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: vehicle.addAnimation("vehicle1",v1);
              break;
      case 2: vehicle.addAnimation("vehicle2",v2);
              break;
      case 3: vehicle.addAnimation("vehicle3",v3);
              break;
      case 4: vehicle.addAnimation("vehicle4",v4);
      default: break;
    }
      vehicle.velocityX= -8;
      vehicle.lifetime = 80;

    vehicle.depth = backbg.depth;
    vehicle.depth = backbg.depth -1;
    vehicle.scale = 0.4;
    vehiclesGroup.add(vehicle);
  }
}

function togglePlaying(){
  if(!bgSound.isPlaying()){
    bgSound.play();
    button2.hide();
  }else{
    bgSound.stop();
    button2.show();
  }
}
