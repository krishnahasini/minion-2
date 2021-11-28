var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameoversound
var m1, m1_running, m1_collided;
var ground, invisibleGround, groundImage;
var bananasound
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gru,gruImg
var score = 0;
var bg , bgImg
var gameOver, restart;


function preload() {
  m1_running = loadAnimation("Images/m2.jpg", "Images/m3.png", "Images/m4.jpg", "Images/m5.jpg", "Images/m6.jpg");
  m1_collided = loadAnimation("Images/m1.png");

  groundImage = loadImage("ground2.png");

  bananaImage = loadImage("Images/banana.png");

  obstacle1 = loadImage("Images/dru.jpg");
  obstacle2 = loadImage("Images/bratt.png");
  
bananasound=loadSound("catching banana.mp3")
  obstacle3 = loadImage("Images/pink bubble gum.png");
gameoversound=loadSound("gameover.mp3")
gruImg=loadImage("Images/g.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
 happyminion=loadAnimation("Images/m1.png")
  bgImg=loadImage("Images/bratt house 1.jpg")
}

function setup() {
  createCanvas(600, 200);

  m1 = createSprite(50, 180, 20, 50);
  m1.debug=true
 m1.setCollider("rectangle",0,0,180,300)
  m1.addAnimation("running", m1_running);
  m1.addAnimation("collided", m1_collided);
  m1.addAnimation("hm",happyminion)
  m1.scale = 0.2;
 gru=createSprite(300,120)
 gru.scale=0.2
 gru.addImage(gruImg)
 gru.visible=false



  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  bananaGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: " + score, 500, 50);

  if (gameState === PLAY) {

    ground.velocityX = -(6 + 3 * score / 100);
    //change the trex animation
    m1.changeAnimation("running", m1_running);

    if (keyDown("space")) {// && m1.y >= 159) {
      m1.velocityY = -12;
    }

    m1.velocityY = m1.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    m1.collide(invisibleGround);
    spawnbananas();
    spawnObstacles();

    if (obstaclesGroup.isTouching(m1)||score===100) {
      gameState = END;
    }

    
  }
  
  else if (gameState === END) {
    if(score===100){
   gru.visible=true
   m1.changeAnimation("hm")
   obstaclesGroup.destroyEach();
   bananaGroup.destroyEach();
    }
    else{

      gameOver.visible = true;
gameoversound.play()
      restart.visible = true;
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      if (mousePressedOver(restart)) {
        reset();
      }
      m1.changeAnimation("collided", m1_collided);
    }
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    m1.velocityY = 0;
    
    
    

    
    
  }


  drawSprites();
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = m1.depth;
    m1.depth = m1.depth + 1;

    //add each cloud to the group
    bananaGroup.add(banana);
  }
  bananaGroup.overlap(m1, increaseScore)

}
function increaseScore(spr) {
  spr.remove()
  bananasound.play()
  score = score + 10
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.debug=true


    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        obstacle.scale = 0.25
        obstacle.setCollider("rectangle",0,0,300,600)
        break;
      case 2: obstacle.addImage(obstacle2);
        obstacle.scale =  0.25
        obstacle.setCollider("rectangle",30,0,200,300)
        break;
      case 3: obstacle.addImage(obstacle3);
        obstacle.scale =  0.05
        obstacle.setCollider("circle",0,0,400)
        break;
      


      default: break;
    }

    //assign scale and lifetime to the obstacle           

    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

}


