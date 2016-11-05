var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);

// Use forces to move the ball
// Use forces to move the ball

translate(0,0);
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
              game_vars.startscreen=1;  // edit this
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
      if(keyArray[37]===1){
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
      if(keyArray[37]===1){
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
    this.size =40;
    this.angle = 0;
};var ball = new ballObj(300,300);

ballObj.prototype.draw = function(x,y) {
  pushMatrix();
  translate(x,y);
  rotate(this.angle);
  fill(10, 196, 196,200);
  ellipse(0, 0,this.size, this.size);
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


var npcObj = function(x, y){
    this.position = new PVector(x,y);
    this.legs = 0;
    this.face = 0;
};var player = new npcObj(100, 100);

npcObj.prototype.draw = function() {
    if(this.face === 0){
       image(myImages[this.legs], this.position.x, this.position.y, 15, 35);
    }
    else{
       image(myImages[this.legs+3], this.position.x, this.position.y, 15, 35);
    }
    
};
npcObj.prototype.move = function() {
    if(keyPress === 1){
        if (keyArray[LEFT] === 1) {
            this.position.x--;
        }
        if (keyArray[RIGHT] === 1) {
            this.position.x++;
        }
        if (keyArray[UP] === 1) {
            this.position.y--;
            this.face = 0;
        }
        if (keyArray[DOWN] === 1) {
            this.position.y++;
            this.face = 1;
        }  
        if(framerate < frameCount-5){
            framerate = frameCount;
            this. legs = (this.legs+1)%3;
        }
    }
    var npcCenter = new PVector(15,20);
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
    }
    
};


var frame_Start = frameCount;
var initialScale = 1;
var initialPlayer = new npcObj(-5, 100);
var startScreenAnimation = function(){
    pushMatrix();
    initialPlayer.face= 1;
    pushMatrix();
    scale(initialScale);
    translate(initialScale*5,0);
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

draw = function() {
    
     if(game_vars.startscreen === 1 | game_vars.gamescreen1===1  | game_vars.gamescreen2===1 ){
        pushMatrix();
        //translate(300,300);
        background(40, 176, 19);
        
        /* Soccer */
        if(initialized === 0){
            initializeSoccerCharacters();
        }
        
        /* Soccer End */
        
        for (i=0; i<=400; i+=8) {
            for (j=0; j<=400; j+=8) {
                fill(164, 181, 9);
                rect(i,j,4,4);
            }
        }
        startScreenAnimation();
        board.draw();
        arrow_array[0].draw();
        arrow_array[1].draw();
        coin_array[0].draw();
        light.draw();
        fill(4, 0, 255);
        textSize(30);
        fill(19, 99, 51);
        
        var f = createFont("Bauhaus 93");
        textFont(f, 40);
        fill(161, 39, 8);
        text("Board and field game",10,40,450,200);
        fill(54, 42, 19);
         textFont(f, 30);
        text("Reversi " ,150,100,300,200);
        text("Soccer " ,150,140,300,200);
        text("Help " ,170,180,300,200);
        text("About " ,160,220,300,200);
        popMatrix();
    }
     
     if(game_vars.helpscreen === 1){
        background(40, 176, 19);
    
        noStroke();
        var n1 = k_a;  
        for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=400; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(0, c, 0,150);
            rect(x,y,8,8);
            n2 += 0.01; // step size in noise
        }
        n1 += 0.01; // step size in noise
        }
    k_a -= 0.01;  // speed of clouds
        
        arrow_array[0].draw();
        arrow_array[1].draw();
        
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        fill(54, 42, 19);
        text("HELP",30,20,300,200);
        text("Reversi " ,160,180,300,200);
        text("Soccer " ,160,220,300,200);
     }
     
     if(game_vars.helpscreen_soccer === 1){
        background(12, 125, 14);
        noStroke();
        ball.size = 100;
        ball.draw(330, 100);
        ball.angle = ball.angle + 1 * oneDegree;
        
        fill(66, 25, 25);
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        text("HELP",30,20,300,200);
        
        var f = createFont("Calibri");
        textFont(f, 15);
        fill(247, 247, 247);
        text("You would be playing soccer with the computer.\n\nUse the arrow keys to navigate the active player from your team \n\nActive player will be automatically selected based on the ball's current location\n\n",30,50,220,400);
        text("Click the mouse on canvas to pass the ball to the specific location\n\n The game would be for 5 minutes and the team with highest score wins the game\n\n If the match ties, then the decision will be based on the penalty shoot out\n                                  HAPPY SOCCER ",30,230,320,400);
        
        
     }
     
      if(game_vars.helpscreen_reversi === 1){
        background(12, 125, 14);
        pushMatrix();
        if(frameCount - count > 90){
            count = frameCount;
            ic++;
        }
        if(ic===3){ic=0;}
        image(board_image[ic],270,30,120,120);
        translate(0,-200);
        translate(0,-50);
        stroke(0, 0, 0);
        popMatrix();


        fill(74, 19, 2);
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        
        text("HELP",30,20,300,200);
        var f = createFont("Calibri");
        textFont(f, 15);
        fill(247, 247, 247);
        text("Reversi is a two player board game. Each player controls either the black or the white tile.  The black gets to move first. At any point in the game any square on the 8x8 board can only be occupied by either a tile of one color.",30,50,220,400);
        text("Each turn consists of one player placing one tile of his color in any one of the spaces which allows him to capture his opponents tiles. The tiles can be captured vertically, horizontally and diagonally. The above figures show all the legal positions available and how the captured pieces are flipped. The game is played until no position on the board is a legal position for either of the player. If one player at any point in the game does not have a legal move, he must pass. The winner is the player who has the most number of tiles at the end of the game.",30,190,320,400);
        //text("It is a ",30,70,300,200);
        

    }
    if(game_vars.aboutscreen === 1){
        background(0, 255, 230);
        
        background(40, 176, 19);
    
        noStroke();
        var n1 = k_a;  
        for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=400; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(0, c, 0,150);
            rect(x,y,8,8);
            n2 += 0.01; // step size in noise
        }
        n1 += 0.01; // step size in noise
        }
    k_a -= 0.01;  // speed of clouds
        
        fill(59, 5, 5);
         var f = createFont("Bauhaus 93");
        textFont(f, 25);
        text("Authors : ",40,100,400,400);
        textFont(f, 20);
        text("Aravind V",40,200,400,400);
        text("Keerthi G",40,170,400,400);
    }
     //ball.draw(ball.position.x, ball.position.y);
    /* player.draw();
     
     player.move();*/ 
     
     
     
};


}};
