var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
	
	

/*
Board and field game championship
by Keerthi Gowda and Aravind 

Key Features
         1. Shadow for the coin along with matching light source
         2. Animated player and interactive menu.
         3. Help with 3 move animation for board game
         4. Press Enter to select option and left arrow to return to previous screen
    Note : Menu Items Reversi and Soccer are not connected to anything and do not work.

*/


// Use forces to move the ball

translate(0, 0);
angleMode = "radian";
var oneDegree = 3.14/180;
var centerX = 200;
var centerY = 200;
var keyArray = [];
var myImages = [];
var r=255;
var g = 0;
var b = 0;
var initialized = 0;
var keyPress = 0;
var framerate = frameCount;
var k_a=random(1500);

// arvind
var enter =0;
var light;
keyArray[UP] = keyArray[DOWN] = 0;
var arrow_array = [];
var coin_array = [];
var board_map = [];
var board;
var i,j;
var board_image = [];
var drawing=0;
var count=0;
var ic=0;
var a_c=0;
var a_n1 = random(1500);
var a_n2 = 0;
var a_a = random(1500);

var game_vars1 = function(){		// declaring variable which controls state of game
  this.startscreen = 1;
  this.gamescreen1 = 0;
  this.gamescreen2 = 0;
  this.winscreen = 0;
  this.helpscreen = 0;
  this.helpscreen_soccer = 0;
  this.helpscreen_reversi = 0;
  this.aboutscreen=0;
};

/******* Reversi **********/

for(i=0;i<8;i++){
    board_map[i]=[];
}

board_map[4][4]=0;
board_map[3][3]=0;
board_map[4][3]=1;
board_map[3][4]=1;

var draw1_board = function(){
    
    background(255, 255, 255);
    this.width1=100;
    this.height1=100;
    pushMatrix();
    translate(200,200);

    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[0] = get(140,140,120,120);
    background(255, 255, 255);
    board_map[3][3]=1;
    board_map[3][2]=1;
    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[1] = get(140,140,120,120);
    background(255, 255, 255);
    board_map[3][3]=0;
    board_map[2][2]=0;
    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[2] = get(140,140,120,120);
    popMatrix();
    
};

draw1_board();

for(i=0;i<8;i++){
    board_map[i]=[];
}

board_map[4][4]=0;
board_map[3][3]=0;
board_map[4][3]=1;
board_map[3][4]=1;


var game_vars = new game_vars1();

var arrow =function(x,y,t){
    this.x=x;
    this.y=y;
    this.side = t;
    this.a=0;
};

arrow.prototype.draw = function() {
    this.update();
    strokeWeight(4 - 3*sin(this.a));
    stroke(255, 0, 0);
    fill(242, 255, 0);
    pushMatrix();
    translate(this.x,this.y);
    scale(this.side,1);
    rect(-20,-8,40,16);
    triangle(10,-20,10,20,30,0);
    popMatrix();
};

arrow.prototype.update = function(){
    this.a+=0.1;
    if(this.a>3.141){this.a = -3.414;}

    if(game_vars.startscreen ===1){
        if(this.y>=230){
            this.y=230;
        }    
        if(this.y<=110){
            this.y=110;
        }
    }
    if(game_vars.helpscreen === 1){
        if(this.y>=230){
            this.y=230;
        }    
        if(this.y<=190){
            this.y=190;
        }
    }

};

var light_source = function(x,y){
    this.x=x;
    this.y=y;
    this.a=PI/2;
    this.i=0/21;
    this.s=0.01;
};

light_source.prototype.draw = function() {
    this.update();
    strokeWeight(1);
    pushMatrix();
    translate(this.x,this.y-20);
    rotate(this.a+PI);
    translate(0,-30);
    line(-0,0,0,30);
    fill(255, 0, 0);
    
    fill(255, 251, 0);
    ellipse(0,0,20,20);
    fill(255,255,255,100);
    ellipse(0,0,30,10);
    fill(255, 0, 0);
    arc(0,0,30,30,0,PI);
    
    fill(255, 255, 0,100);
    noStroke();
    quad(-15,0,15,0,420,-380,-420,-380);
    
    popMatrix();
};

light_source.prototype.update = function(){
    
    this.a=2*asin(this.i);
    this.i+=this.s;
    if(this.i>=1/2){this.s=-0.0096;}
    if(this.i<=-1/2){this.s=0.0096;}
    //println(this.i);
    
};

var board_sample = function(x,y){
    this.x=x;
    this.y=y;
    this.a=0;
    this.height = 100;
    this.width = 100;
};

board_sample.prototype.draw = function() {
    pushMatrix();
    translate(this.x,this.y);
    rotate(this.a);
    fill(92, 5, 5);
    rect(-this.width/2-10,-this.height/2-10,this.width+20,this.height+20);
    fill(0, 255, 51);
    rect(-this.width/2,-this.height/2,this.width,this.height);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width/2 + 12.5*j,-this.height/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width/2 + 7.25 +  12.5*j,-this.height/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width/2 + 7.25 +  12.5*j,-this.height/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }

    popMatrix();
};

var coin = function(x,y,t){
    this.x=x;
    this.y=y;
    this.t=t;
    this.a=0;

};

coin.prototype.draw= function() {
    this.update();
    if(this.t===0){
        pushMatrix();
        stroke(0, 0, 0);
        strokeWeight(1);
        translate(this.x,this.y);
        strokeWeight(2);
        fill(13, 2, 2);
        beginShape();
        vertex(-15,10);
        bezierVertex(-5 + 20*sin(this.a),30 - abs(5*sin(this.a)),5+20*sin(this.a),30 - abs(5*sin(this.a)),15,10);
        endShape();
        fill(255,255,255);
        noStroke();
        rect(-15,0,30,10);
        stroke(0, 0, 0);
        arc(0,10,30,10,0,3.141);
        line(-15,10,-15,0);
        line(15,10,15,0);
        ellipse(0,0,30,10);
        
        ellipse(0,0,20,7);
        popMatrix();
    }

};

coin.prototype.update = function(){
    this.a+=0.03;
    if(this.a>3.141){this.a = -3.141;}
    
};

keyPressed = function(){
  enter=0;
  keyPress = 1;
  keyArray[keyCode]=1;
  if((game_vars.startscreen ===1 )  && enter === 0){
      enter=1;
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      if(keyArray[10]===1){
          if(arrow_array[0].y===110){
              game_vars.gamescreen1=1;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===150){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=1;
              game_vars.startscreen=0;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===230){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=1;
          }
      }
  }
 
    if(game_vars.aboutscreen ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[37]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
      }
    }
    
    if(game_vars.helpscreen ===1 && enter === 0 ){
      enter=1;
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[37]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
      }
      if(keyArray[10]===1){
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 1;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===230){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 1;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
          }
      }
    }
    
    if(game_vars.helpscreen_soccer ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
      }
    }
    
    if(game_vars.helpscreen_reversi ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
      }
    }
    
    if(game_vars.gamescreen2 ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[37]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
      }
      /* New edit */
      
      /* End edit */
    }
};

keyReleased = function(){
  keyArray[keyCode]=0;
    keyPress = 0;
};

board = new board_sample(320,300);

light = new light_source(200,300);

coin_array.push( new coin(200,360,0));

arrow_array.push( new arrow(100,110,1));
arrow_array.push( new arrow(300,110,-1));


/****** end reversi *************/



var initializeSoccerCharacters = function(){
    /***********************/
    initialized  = 1;
    background(40, 176, 19);
    pushMatrix();
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20);
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+110, 23,15,50);
    rect(this.x+2, this.y+110, 23,15,50);
    fill(0, 21, 255,30);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    
    /***********End ***************/
    /**********Start*************/
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    //legs
    fill(230, 229, 181);
    //rect(this.x-22, this.y+95, 20, 20); // left leg
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0); 
    rect(this.x-25, this.y+95, 23,15,50); // Changed 110 to 95 
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /**********************End**************/
    /**********Start*************/
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    //legs
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20); 
    //rect(this.x+2, this.y+95, 20, 20);// right leg
    
    fill(0,0, 0); 
    rect(this.x-25, this.y+105, 23,15,50);  
    rect(this.x+2, this.y+95, 23,15,50);// Changed 110 to 95
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /**********************End**************/
    
    /************ Front ******************/
    /*************Start *****************/
    /* Second Image */
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20);
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+110, 23,15,50);
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /****************end*************************/
    /*************Start *****************/
    background(40, 176, 19);
    /* Second Image */
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    //rect(this.x-22, this.y+95, 20, 20); // left leg
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+95, 23,15,50); // changed 110 t0 95
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /***********************end*********************/
    
    /*************Start *****************/
    /* Second Image */
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20); 
    //rect(this.x+2, this.y+95, 20, 20);// right leg
    
    fill(0,0, 0);
    rect(this.x-25, this.y+105, 23,15,50); 
    rect(this.x+2, this.y+95, 23,15,50);// changed 110 t0 95
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
/***********************end*********************/
};


var displayCustomText = function(a, x, y, font){
    var f = createFont("Bauhaus 93");
    textFont(f, font);
    text(a, x, y);
};

var drawBackground = function(){
    noStroke();
    fill(40, 176, 19);
    rect(0, -200, 400, 800);
    fill(34, 133, 16,100);
    rect(0, -200, 30, 800);
    for(var i=1; i<7; i++){
        rect(60*i, -200, 30, 800);
    }
    stroke(255, 255, 255);
    noFill();
    strokeWeight(2);
    rect(centerX-195,centerY-290, 390, 580);
    strokeWeight(1);
    line(0, centerY, 400, centerY);
    ellipse(centerX, centerY, 100, 100);
    
    rect(centerX-100, centerY-290, 200, 100);
    rect(centerX-50, centerY-290, 100, 50);
    
    rect(centerX - 100, centerY - 290, 200, 100);
    rect(centerX - 50, centerY - 290, 100, 50);
    
    rect(centerX - 100, centerY - 290, 200, 100);
    rect(centerX - 50, centerY - 290, 100, 50);
    rect(centerX - 100, centerY + 290, 200, -100);
    rect(centerX - 50, centerY + 290, 100, -50);
    
    arc(centerX, centerY-190, 50, 50, 0, oneDegree*180);
    arc(centerX, centerY+190, 50, 50, oneDegree*180,oneDegree*360);
    
    rect(centerX-25, centerY-300, 50, 10);
    rect(centerX-25, centerY+300, 50, -10);
    // goal
    
};


var keyReleased = function() {
    keyArray[keyCode] = 0;
    keyPress = 0;
};

var ballObj = function(x, y){
    this.position = new PVector(x,y);
    this.size = 5;
    this.angle = 0;
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(0, 0);
    this.drag = new PVector(0, 0);
    this.aVelocity = 0;
    this.inTransit = 0;
    
};var ball = new ballObj(300,300);

var defend_state = 0;
var attack_state = 1;
var prepareToKickoff = 2;
var defending = function(){
};
var attacking = function(){
};
var prepareToKickoff = function(){
};
var teamObj = function(n,c){
    this.controlPlayer = c;
    this.number = n;
    this.state = [new defending(), new attacking(), new prepareToKickoff()];
    this.currentState = 0;
};

var kickoff_num = 0;
var wait_num = 1;
var chaseBall_num = 2;
var receiveBall_num = 3;
var kickBall_num = 4;
var dribble_num = 5;
var gaurdAttacker_num = 6;
var chaseToIntercept_num = 7;

var kickoffState = function(){
};
var waitState = function(){
};
var chaseBallState = function(){
};
var receiveBallState = function(){
};
var kickBallState = function(){
};
var dribbleState = function(){
};
var gaurdAttackerState = function(){
};
var chaseToInterceptState = function(){
};
var playerObj = function(x, y, t, f, n,d){
    this.position = new PVector(x,y);
    this.baseposition = new PVector(x,y);
    this.legs = 0;
    this.face = f;
    this.velocity = new PVector(0, 0);
    this.team = t;
    this.state = [new kickoffState(),new waitState(), new chaseBallState(), new receiveBallState(), new kickBallState(), new dribbleState(), new gaurdAttackerState(), new chaseToInterceptState()];
    
    this.currentstate = 0;
    this.number = n;
    this.defenceIntelligence = 0;
    // Add description features to this player
};

var goalieObj = function(x, y, t) {
    this.x = x;
    this.y = y;
    this.team = t;
};

/***** All soccer game variables ******************/
var ball = new ballObj(150, 150);
var players = [];
var player = new playerObj(100, 100);
var target = new PVector(0, 0);
var teamPossesion = 0;
var score0 = 0;
var score1 = 0;
var numOfPlayers = 6;
var team0 = 0;
var team1 = 1;
var front = 1;
var back = 0;
// All players
//Team 0
players.push(new playerObj(100,40 , team0, front, 0,10));
players.push(new playerObj(300,40 , team0, front,1,9));

players.push(new playerObj(50,120 , team0, front,2,8));
players.push(new playerObj(350,120 , team0, front,3,7));

players.push(new playerObj(100,170 , team0, front,4,5));
players.push(new playerObj(200,200 , team0, front,5,3));

//Team 1
players.push(new playerObj(100,380 , team1, back,6,10));
players.push(new playerObj(300,380 , team1, back,7,9));

players.push(new playerObj(50,300 , team1, back,8,8));
players.push(new playerObj(350,300 , team1, back,9,7));

players.push(new playerObj(300,250 , team1, back,10,5));
players.push(new playerObj(180,200 , team1, back,11,3));


var goalies = [new goalieObj(30, 200, 0), new goalieObj(370, 200, 1)];
var teams = [new teamObj(team0,0), new teamObj(team1,11)];

// game variables
var game_state = 0;

var goal_0_left = new PVector(centerX-25, centerY+300); // Team 0's target goal
var goal_0_right = new PVector(centerX+25, centerY+300);
var goal_0_center = new PVector(centerX, centerY+300);
var goal_1_left = new PVector(centerX-25, centerY-300); // team1's target goal
var goal_1_right = new PVector(centerX+25, centerY-300);
var goal_1_center = new PVector(centerX, centerY-300);

var k_thresholdAngletoPass = 0;

var k_random = 0;
var k_frame_random = frameCount;
var myClosestPlayer = 0;

// Start screen variables
var frame_Start = frameCount;
var initialScale = 1;
var initialPlayer = new playerObj(-5, 100);
var allPlayerStates = [0,0,0,0,0,0,0,0,0,0,0,0];
/************ End of all soccer game variables ********/

/******************ballObj***********************/
ballObj.prototype.draw = function() {
 //   ball.position.x = mouseX;
  //  ball.position.y = mouseY;
    
  pushMatrix();
  translate(this.position.x, this.position.y);
  rotate(this.angle);
  fill(155,255, 255,250);
  ellipse(0, 0,this.size+5, this.size+5);
  stroke(132, 167, 209);
  strokeWeight(1);
  arc(0,0,this.size, this.size/2, 0, 180*oneDegree);
  arc(0,-this.size/3,this.size, this.size/2, 20 * oneDegree, 160*oneDegree);
  
  arc(0,0,this.size/2,this.size,  90*oneDegree, 270*oneDegree);
  arc(this.size/3,0,this.size/2,this.size, 120*oneDegree, 250*oneDegree);
  fill(10, 196, 196,0);
  
  arc(0,0,this.size, this.size/2, 0, 180*oneDegree);
  arc(0,-this.size/3,this.size, this.size/2,20 * oneDegree, 160*oneDegree);
  fill(0, 0, 0);
  displayCustomText("NIKE", -this.size/3.2,5, this.size/4, 30);
  popMatrix();
};

ballObj.prototype.move = function() {
 
    this.velocity.add(this.drag);
    this.position.add(this.velocity);
    this.drag.set(this.velocity.x, this.velocity.y);
    this.drag.mult(-0.03);
    
    this.aVelocity = this.velocity.mag() * 4;
    if (this.velocity.x < 0) {
        this.aVelocity = -this.aVelocity;
    }
    this.angle += this.aVelocity;
    
    if (this.velocity.mag() < 0.3) {
        this.inTransit = 0;
    }
    else {
        this.inTransit = 1;
    }
    
    // Goal scoring
/*    if (this.position.x < 0) {
        this.position.x = 0;
        this.velocity.set(0, 0);
        if ((this.position.y > 90) && (this.position.y < 310)) {
            teamPossesion = 0;
            score1++;
        }
    }
    else if (this.position.x > 400) {
        this.position.x = 400;
        this.velocity.set(0, 0);
        if ((this.position.y > 90) && (this.position.y < 310)) {
            teamPossesion = 1;
            score0++;
        }
    } */
    if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.set(0, 0);
    }
    else if (this.position.y > 400) {
        this.position.y = 400;
        this.velocity.set(0, 0);
    }
    
};

ballObj.prototype.heldAttack = function(team) {
    var h = 0;
    for (var i=0; i<players.length; i++) {
        if(players[i].team !== team.number){
            if (dist(this.position.x, this.position.y, players[i].position.x, players[i].position.y) < 15) {
                h = 1;
            }
        }
    }
    return h;
};

ballObj.prototype.heldDefence = function(team){
    var h = 0;
    for (var i=0; i<players.length; i++) {
        if(players[i].team === team.number){
            if (dist(this.position.x, this.position.y, players[i].position.x, players[i].position.y) < 15) {
                h = 1;
            }
        }
    }
    return h;
};
/******************End ballObj***********************/

/***************teamObj***********************/
teamObj.prototype.changeState = function(s){
    this.currentState = s;
};
/*************** end teamObj***********************/

/***************playerObj***********************/
playerObj.prototype.chaseBall = function() {
        var x = ball.position.x + ball.velocity.x * 4;  // predict future position
        var y = ball.position.y + ball.velocity.y * 4;
        this.velocity.set(x - this.position.x, y - this.position.y);
        //this.velocity = PVector.div(this.velocity, this.velocity.mag());
        //var magnitude = abs(this.velocity.mag());
		var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
		
        if(magnitude > 0){	
            this.velocity.x =  this.velocity.x/magnitude;
            this.velocity.y =  this.velocity.y/magnitude;
	    }
	    else{
	        return;
	    }
        this.velocity.mult(0.5);
        this.position.add(this.velocity);
        if(this.velocity.y > 0){this.face = 1;}
        else{this.face = 0;}
        
        if(framerate < frameCount-5){
            framerate = frameCount;
            this.legs = (this.legs+1)%3;
        }
};

playerObj.prototype.gohome = function(){
    var x = this.baseposition.x;
    var y = this.baseposition.y;
    this.velocity.set(x - this.position.x, y - this.position.y);
        //this.velocity = PVector.div(this.velocity, this.velocity.mag());
        //var magnitude = abs(this.velocity.mag());
	var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
	
	if(magnitude > 0){	
        this.velocity.x =  this.velocity.x/magnitude;
        this.velocity.y =  this.velocity.y/magnitude;
	}
	else{
	    return;
	}
    this.velocity.mult(0.5);
    this.position.add(this.velocity);
    if(this.velocity.y > 0){this.face = 1;}
    else{this.face = 0;}
        
    if(framerate < frameCount-5){
        framerate = frameCount;
        this.legs = (this.legs+1)%3;
    }
};

playerObj.prototype.chaseToIntercept = function() {
    if (ball.inTransit === 1) {
        var x = ball.position.x;
        var y = ball.position.y;
        
        var v = ball.velocity.get();
  //      x = x + this.defenceIntelligence*ball.velocity.x;
//        y = y + this.defenceIntelligence*ball.velocity.y;
        this.velocity.set(x - this.position.x, y - this.position.y);
        
        var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        
       if(magnitude > 0){	
            this.velocity.x =  this.velocity.x/magnitude;
            this.velocity.y =  this.velocity.y/magnitude;
	    }
	    else{
	        return;
	    }
        this.velocity.mult(1);
        this.position.add(this.velocity);
    }
};

playerObj.prototype.changeState = function(s){
    this.currentstate = s;
};

playerObj.prototype.draw = function() {

    if(this.face === 0){
        if((this.team === 1) && (teams[this.team].controlPlayer ===this.number)){
            text("Active", this.position.x-7, this.position.y-45);
        }
       image(myImages[this.legs], this.position.x-7, this.position.y-30, 15, 35);
       text(this.number, this.position.x-7, this.position.y-35);
    }
    else{
       image(myImages[this.legs+3], this.position.x-7, this.position.y-30, 15, 35);
       text(this.number, this.position.x-7, this.position.y-35);
    }
    noStroke();
    if(this.team === 0){
        fill(255, 255, 0);
        rect(this.position.x-4, this.position.y-16, 9,8);
    }
    
};

var controlPlayer_move = function(me) {
    
    if(keyPress === 1){
        if (keyArray[LEFT] === 1) {
            me.position.x-=1;
            
        }
        if (keyArray[RIGHT] === 1) {
            me.position.x+=1;
        }
        if (keyArray[UP] === 1) {
            me.position.y-=1;
            me.face = 0;
        }
        if (keyArray[DOWN] === 1) {
            me.position.y+=1;
            me.face = 1;
        }  
        if(framerate < frameCount-5){
            framerate = frameCount;
            me. legs = (me.legs+1)%3;
        }
    }
/*    var npcCenter = new PVector(15,20);
    npcCenter =  PVector.add(npcCenter, this.position);
    var vec = PVector.sub(npcCenter, ball.position);
    if(vec.mag() < 10){
        if (keyArray[LEFT] === 1) {
            ball.position.x-=5;
        }
        if (keyArray[RIGHT] === 1) {
            ball.position.x+=5;
        }
        if (keyArray[UP] === 1) {
            ball.position.y-=5;
        }
        if (keyArray[DOWN] === 1) {
            ball.position.y+=5;
        }  
    }*/
    
};

playerObj.prototype.keepmoving = function(me){
    me.position.y = me.position.y+ 0.05* sin(k_random);
    k_random = k_random + oneDegree*2;
    if(framerate < frameCount-5){
            framerate = frameCount;
            me.legs = (me.legs+1)%3;
   }
};

/***************End playerObj***********************/

/*************Golie Object*********************/
goalieObj.prototype.draw = function() {
};
goalieObj.prototype.move = function() {
};
/*****************end golie object***************/

/*****************Common functions **************/
var chooseClosestPlayer = function(team) {
    var bestPlayer = 0;
    var bestDist = 1000;
    var localTarget = 0;
    var d = 0;
    localTarget = ball.position;
    for (var i = 0; i< players.length; i++) {
        if ( players[i].team === team.number) {
            d = PVector.sub(localTarget, players[i].position);
            var dis = d.mag();
            if (dis < bestDist) {
                bestDist = dis;
                bestPlayer = i;
            }
        }
    }
    return(bestPlayer);
};

var chooseClosestPlayerThanMe = function(me, team) {
    var bestPlayer = 0;
    var bestDist = 1000;
    var localTarget = 0;
    var d = 0;
    localTarget = ball.position;
    for (var i = 0; i< players.length; i++) {
        if ( (i !== me.number) && (players[i].team === team.number)) {
            d = PVector.sub(localTarget, players[i].position);
            var dis = d.mag();
            if (dis < bestDist) {
                bestDist = dis;
                bestPlayer = i;
            }
        }
    }
    return(bestPlayer);
};

// Returns score on how safe it is to pass
var safeToPass = function(player1, player2){
    var angle =0;
    var score = 100;
    var vec1 = PVector.sub(player1.position, player2.position);
    var vec2 = 0;
    for (var i = 0; i< players.length; i++) {
        if ( players[i].team !== teamPossesion)   {
            vec2 = PVector.sub(player1.position, players[i].position);
            
            angle = PVector.angleBetween(vec1,vec2) / oneDegree;
            
            if(angle > 180){ angle = 360-180 ;}
            if(abs(angle) < 5){
                score = score - 50;
            }
            else if(abs(angle) < 10){
                score = score - 30;
            }
            else if(abs(angle) < 20){
                score = score - 20;
            }
        }    
    }
    return score;
};

var chooseBestPlayerToPass = function(me,team){
    var bestPlayer = 0;
    var bestScore = 0;
    var angle = 0;
    var score;
    for (var i = 0; i< players.length; i++) {
        if ( (i !== me.number) && (players[i].team === me.team)) {
            score = safeToPass(me, players[i]); 
            if(score >= bestScore){
                bestScore = score;
                bestPlayer = i;
            }
        }
    }
    return bestPlayer;
};

var team0_attackingArea = [];
var team1_attackingArea = [];
for(var rows=0; rows<4; rows++){
    var xStart = 0;
    var yStart = (rows*60);
    for(var columns=0; columns<4; columns++){
        team1_attackingArea.push(new PVector(xStart+50, yStart+20-100));
        xStart = xStart+100;
    }
}
for(var rows=0; rows<4; rows++){
    var xStart = 0;
    var yStart = (rows*60);
    for(var columns=0; columns<4; columns++){
        team0_attackingArea.push(new PVector(xStart+50, yStart+20+300));
        xStart = xStart+100;
    }
}
var squaredDistance = function(x, y){
    var distance = 0;
    distance = (x.x - y.x) * (x.x - y.x) + (x.y - y.y) * (x.y - y.y);
    return distance;
};

var findPass = function(me, team){
    var bestscore = 0;
    var score = 0;
    var bestarea = 0;
    if(team.number === 0){
        for(var i=0; i<team0_attackingArea.length; i++){
            var dist_goal = squaredDistance(team0_attackingArea[i], goal_0_center);
            if(dist_goal < 5000){ score = 100;}
            else { score = 80;}
            
            var safe_for_me_to_pass = safeToPass(me, team0_attackingArea[i]);
            score = score + safe_for_me_to_pass;
            
            for( var j=6; i<players.length; j++){  // Other team players
                var distance= squaredDistance(players[j].position, team0_attackingArea[i]);
                if(distance > 2500){    // 50 pixels
                    score = score-50;
                }
                else if(distance > 5000){   // 70 pixels
                    score = score-30;
                }
                else if(distance > 10000){   // 100 pixels
                    score = score-10;
                }
            }
            for( var j=1; i<players.length/2; j++){  // Our team players
                var distance= squaredDistance(players[j].position, team0_attackingArea[i]);
                if(distance < 2500){    // 50 pixels
                    score = score + 50;
                }
                else if(distance < 5000){   // 70 pixels
                    score = score+30;
                }
                else if(distance < 10000){   // 70 pixels
                    score = score+10;
                }
            }
            if(score > bestscore){
                bestscore = score;
                bestarea = i;
            }
        }
    }
    else if(team.number === 1){
        for(var i=0; i<team1_attackingArea.length; i++){
            var dist_goal = squaredDistance(team1_attackingArea[i], goal_1_center);
            if(dist_goal < 5000){ score = 100;}
            else { score = 80;}
            for( var j=6; j<players.length; j++){  // Other team players
                var distance = squaredDistance(players[j].position, team1_attackingArea[i]);
                if(distance > 2500){    // 50 pixels
                    score = score-50;
                }
                else if(distance > 5000){   // 70 pixels
                    score = score-30;
                }
                else if(distance > 10000){   // 100 pixels
                    score = score-10;
                }
            }
            for( var j=1; j<players.length/2; j++){  // Our team players
                var distance= squaredDistance(players[j].position, team1_attackingArea[i]);
                if(distance < 2500){    // 50 pixels
                    score = score + 50;
                }
                else if(distance < 5000){   // 70 pixels
                    score = score+30;
                }
                else if(distance < 10000){   // 70 pixels
                    score = score+10;
                }
            }
            println(score);
            if(score > bestscore){
                bestscore = score;
                bestarea = i;
            }
        }
    }
    return bestarea;
    
};

// Returns score on how likely it is to score the goal
// Computationally expensice. Call only when the player is in the vicinity of the goal
var canScore = function(me){
    var vec1 = 0;
    var vec2 = 0;
    var vec3 = 0;
    var vec4 = 0;
    var vec_centerGoal = 0;
    var angle = 0;
    var angleBwPlayers = 0;
    var ballHeadingAngle = 0;
    var score= 100;
    
    if(me.team === 0){
        vec1 = PVector.sub(me.position, goal_0_left);
        vec2 = PVector.sub(me.position, goal_0_right);
        vec3 = PVector.sub(me.position, goal_0_center);
        angle = PVector.angleBetween(vec1,vec2) / oneDegree;
        ballHeadingAngle = abs(angle/2); // to the center of the post

        if(abs(me.position.y - goal_0_left.y) > 100){
            return 0; // too far
        }
        if(abs(me.position.y - goal_0_left.y)<20){
            score = 200;
        }
        for (var i = 0; i< players.length; i++) {
            if ( players[i].team !== me.team)  {
                vec4 = PVector.sub(me, players[i].position);
                angleBwPlayers = PVector.angleBetween(vec3, vec4)/oneDegree;
                if(abs(angleBwPlayers) < ballHeadingAngle){  // Check this function
                    score = score - 30;
                }
                if(abs(angleBwPlayers) < 1.1*ballHeadingAngle){
                    score = score - 20;
                }
                if(score < 0){
                    return 0;
                }
            }
        }
    }
    else{
        vec1 = PVector.sub(me.position, goal_1_left);
        vec2 = PVector.sub(me.position, goal_1_right);
        vec3 = PVector.sub(me.position, goal_1_center);
        angle = PVector.angleBetween(vec1,vec2) / oneDegree;
        ballHeadingAngle = abs(angle/2); // to the center of the post
        if(abs(me.position.y - goal_1_left.y) > 100){
            return 0; // too far
        }
        
        if(abs(me.position.y - goal_1_left.y)<20){
            score = 200;
        }
        
        for (var i = 0; i< players.length; i++) {
            if ( players[i].team !== me.team)  {
                vec4 = PVector.sub(me, players[i].position);
                angleBwPlayers = PVector.angleBetween(vec3, vec4)/oneDegree;
                if(abs(angleBwPlayers) < ballHeadingAngle){
                    score = score - 30;
                }
                if(abs(angleBwPlayers) < (1.1*ballHeadingAngle)){
                    score = score - 20;
                }
                if(score < 0){
                    return 0;
                }
            }
        }
    }
    
    return score;
};

var scoreKick = function() {
    var inGoal = 0;
    if (((target.x < 30) && (target.y > 100) && (target.y < 300)) ||
        ((target.x > 370) && (target.y > 100) && (target.y < 300))) {
        inGoal = 1;
    }
    return inGoal;
};

var startScreenAnimation = function(){
    pushMatrix();
    initialPlayer.face= 1;
    pushMatrix();
    scale(initialScale);
    translate(initialScale*10,0);
    initialPlayer.draw();
    if(frame_Start < frameCount-10){
        initialScale = initialScale+0.1;
        frame_Start  = frameCount;
         initialPlayer.legs = (initialPlayer.legs+1)%3;
    }
    popMatrix();
    
    if(initialScale>4){
        initialPlayer.position.y = 100;
        initialScale = 1;
    }    
};

/*****************End common functions ************/

/*****************teamObj states executables ***********/
defending.prototype.execute = function(team){
    var closestPlayer = 0;
    closestPlayer = chooseClosestPlayer(team);
    if(team.number === 1 ){
        if(squaredDistance(players[team.controlPlayer].position, ball.position) > 2500){
            if(squaredDistance(players[team.controlPlayer].position, players[closestPlayer].position) > 2500){
            team.controlPlayer = closestPlayer;
            }
        }
    }
    else{
      team.controlPlayer = closestPlayer;
    }
    if (ball.inTransit === 1) {
        allPlayerStates[team.controlPlayer] = chaseToIntercept_num;
    }
    else{
        allPlayerStates[team.controlPlayer] = chaseBall_num;
    }
    if(ball.heldDefence(team) === 1){
        teamPossesion = team.number;
        team.changeState(attack_state);
        allPlayerStates[team.controlPlayer] = wait_num;
    }
    
    for(var i=0;i<players.length; i++){
        players[i].changeState(allPlayerStates[i]);   
    }
};

attacking.prototype.execute = function(team){
    var closestPlayer = 0;
    var palyerToPass = 0;
    var bestPlayer_id = 0;
    var bestPlayer = 0;
    closestPlayer = chooseClosestPlayer(team);
    
    if(team.number === 1 ){
        if(squaredDistance(players[team.controlPlayer].position, ball.position) > 2500){
            if(squaredDistance(players[team.controlPlayer].position, players[closestPlayer].position) > 2500){
            team.controlPlayer = closestPlayer;
            }
        }
    }
    else{
      team.controlPlayer = closestPlayer;
    }
    
    bestPlayer_id = chooseBestPlayerToPass(players[closestPlayer], team);
    bestPlayer = players[bestPlayer_id];
    
    if(ball.heldDefence(team) === 1){
        target.set(bestPlayer.position);
        ball.velocity = PVector.sub(target, ball.position);
        ball.velocity.div(30);
        ball.drag.set(ball.velocity.x, ball.velocity.y);
        ball.drag.mult(-0.001);
        allPlayerStates[bestPlayer_id] = receiveBall_num;
        allPlayerStates[team.controlPlayer] = wait_num;
    }
    if(ball.heldAttack(team) === 1){
        team.changeState(defend_state);
    }
    
    for(var i=0;i<players.length; i++){
        players[i].changeState(allPlayerStates[i]);   
    }
};

prepareToKickoff.prototype.execute = function(){
    for(var i=0;i<players.length; i++){
        players[i].changeState(kickoff_num);   
    }
};
/****************end teamObj states executables *******/

/*****************PlayerObj executables ***********/
kickoffState.prototype.execute = function(me){
    me.gohome();
};
waitState.prototype.execute  = function(me){
   
};
chaseBallState.prototype.execute  = function(me){
    if(teams[1].controlPlayer !== me.number){
        if(teams[me.team].currentState === 0){
            me.chaseBall();
        }
    }
};
receiveBallState.prototype.execute  = function(me){
  
};
kickBallState.prototype.execute  = function(me){
    
};
dribbleState.prototype.execute = function(me){
    
};
gaurdAttackerState.prototype.execute = function(me){
};

chaseToInterceptState.prototype.execute  = function(me){
    if(teams[1].controlPlayer !== me.number){    
        if(teams[me.team].currentState === 0){
            me.chaseToIntercept(); 
        }
    }
};

/****************end playerObj executables *******/

draw = function() {

        drawBackground();
        if(initialized === 0){
            initializeSoccerCharacters();
        }
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press <- [LEFT] key to go back", 5, 380, 400, 300);
        
        for(var i=0; i<players.length; i++){
            players[i].draw();
            var currstate = players[i].currentstate;
            players[i].state[currstate].execute(players[i]);
        }
        
        for(var i=0; i<teams.length; i++){
            teams[i].state[teams[i].currentState].execute(teams[i]);
        }
        for(var i=0; i<team0_attackingArea.length; i++){
            rect(team0_attackingArea[i].x, team0_attackingArea[i].y,5,5);
        }
        
        for(var i=0; i<team1_attackingArea.length; i++){
            rect(team1_attackingArea[i].x, team1_attackingArea[i].y,5,5);
        }
        controlPlayer_move(players[teams[1].controlPlayer]);
        ball.move();
        ball.draw();
    //    findPass(players[teams[1].controlPlayer], teams[1]);
     
     
     
};
}};
