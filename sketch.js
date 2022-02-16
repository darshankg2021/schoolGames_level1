var input1;

var gameState;

var player;

var backgroundImg;

var playerBlue, playerGreen, playerRed, playerPurple, playerBlack;

var laser1 , laser2; 
var laserStarter1, laserStarter2;

var bTop, bBottom, bLeft, bRight;

var up, down, left, right;

var upImg, downImg, leftImg, rightImg;

var SeparationBorder;

var endPoint1;

var gun, gunImg;

var score = 0;

var reset, resetImg;

function preload(){
    backgroundImg = loadImage("./assets/bg.png.jpg");
    upImg = loadImage("./assets/upButton.png");
    downImg = loadImage("./assets/downButton.png");
    leftImg = loadImage("./assets/leftButton.png");
    rightImg = loadImage("./assets/rightButton.png");
    gunImg = loadImage("./assets/gun.png");
    resetImg = loadImage("./assets/restart.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    input1 = new Form();

    player = createSprite(width/2, height -20, 20, 20);
    player.shapeColor = "green";
    player.visible = false;

    laser1 = createSprite(width/4, height/2 , width/2 , 10);
    laser1.shapeColor = "red";
    laser1.visible = false;

    laserStarter1 = createSprite(laser1.position.x - width/4, laser1.positionY, 30, 50);
    laserStarter1.shapeColor = "blue";
    laserStarter1.visible = false;

    laser2 = createSprite(width - width/4, height/2 , width/2 , 10);
    laser2.shapeColor = "red";
    laser2.visible = false;

    laserStarter2 = createSprite(laser2.position.x + width/4, laser2.positionY, 30, 50);
    laserStarter2.shapeColor = "blue";
    laserStarter2.visible = false;

    bTop = createSprite(width/2 , 0, windowWidth, 20);
    bTop.shapeColor = "blue";

    bBottom = createSprite(width/2 , height, windowWidth, 20);
    bBottom.shapeColor = "blue";

    bLeft = createSprite(0 , height/2, 20, windowHeight);
    bLeft.shapeColor = "blue";

    bRight = createSprite(width , height/2, 20, windowHeight);
    bRight.shapeColor = "blue";

    up = createSprite(width -150, height/2 +90, 50, 50);
    up.addImage(upImg);
    up.scale = 0.2;
    up.visible = false;

    down = createSprite(width -150, height -90, 50, 50);
    down.addImage(downImg);
    down.scale = 0.2;
    down.visible = false;

    left = createSprite(width -220, height/2 +155, 50, 50);
    left.addImage(leftImg);
    left.scale = 0.2;
    left.visible = false;
    
    right = createSprite(width - 80, height/2 +155, 50, 50);
    right.addImage(rightImg);
    right.scale = 0.2; 
    right.visible = false;

    endPoint1 = createSprite(width/2, 10, 50, 10);
    endPoint1.shapeColor = "lime";
    endPoint1.visible = false;

    gun = createSprite(width/2, height/2, 20, 20);
    gun.addImage(gunImg);
    gun.scale = 0.2;
    gun.visible = false;

    reset = createSprite(width/2 , height/2 + 100, 20, 20);
    reset.addImage(resetImg);
    reset.visible = false;
}

function draw(){
    background("lightBlue");

    input1.display();

    if(gameState === "start"){
        input1.hide();
    }

    if(gameState === "play"){
        player.visible = true;
        laser1.visible = true;    
        laser2.visible = true; 
        laserStarter1.visible = true;
        laserStarter2.visible = true;

        laser1.bounceOff(bTop);
        laser1.bounceOff(bBottom);
        laser2.bounceOff(bTop);
        laser2.bounceOff(bBottom);

        laserStarter1.position.y = laser1.position.y;
        laserStarter2.position.y = laser2.position.y

        playerMovementTrue();
        playerCollision();
        unhide(up);
        unhide(down);
        unhide(left);
        unhide(right);
        unhide(endPoint1);

        if(laser1.isTouching(player) || laser2.isTouching(player)){
            gameState = "end";
            player.y -= 100;
        }

        if(player.isTouching(endPoint1)){
            gameState = "play2";
        }
    }

    if(gameState === "play2"){
        play1Hide();
        gun.visible = true;

        playerMovementTrue();
        playerCollision();

        if(player.isTouching(gun)){
            gameState = "play3";
            score = score + 10;
            text("Score: "+ score, width -100 , 100);
        }
    }

    if(gameState === "play3"){

    }

    if(gameState === "end"){
        fill("purple");
        textSize(35);
        text("You Lose The Game..!", width/2 - 100, height/2);
        reset.visible = true;
        if(mousePressedOver(reset)){
            gameState = "play";
        }
        play1Hide();
        hide(player);
    }

    drawSprites();
}

function play1Hide(){
    laser1.visible = false;
    laser2.visible = false;
    laserStarter1.visible = false;
    laserStarter2.visible = false;
    endPoint1.visible = false;
}

function playerMovementTrue(){
    if(mousePressedOver(up)){
        player.y -= 5;
    }
    else if(mousePressedOver(down)){
        player.y += 5;
    }
    else if(mousePressedOver(left)){
        player.x -= 5;
    }
    else if(mousePressedOver(right)){
        player.x += 5;
    }

    if(keyDown("up")){
        player.y -= 5;
    }
    else if(keyDown("down")){
        player.y += 5;
    }
    else if(keyDown("left")){
        player.x -= 5;
    }
    else if(keyDown("right")){
        player.x += 5;
    }
}

function playerCollision(){
    player.collide(bTop);
    player.collide(bBottom);
    player.collide(bRight);
    player.collide(bLeft);
}

function unhide(object){
    object.visible = true;
}

function hide(object){
    object.visible = false;
}