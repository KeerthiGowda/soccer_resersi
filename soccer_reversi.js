var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
/*title

games 1
games 2
help/instructions
about ( authors )

character
my board*/

angleMode = "radians";
var light;
var keyArray = [];
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


var game_vars1 = function(){		// declaring variable which controls state of game
  this.startscreen = 1;
  this.gamescreen1 = 0;
  this.gamescreen2 = 0;
  this.winscreen = 0;
  this.helpscreen = 0;
  this.aboutscreen=0;
};
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
    if(this.y>=230){
        this.y=230;
    }    
    if(this.y<=110){
        this.y=110;
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
  keyArray[keyCode]=1;
  if(game_vars.startscreen ===1){
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      if(keyArray[10]===1){
          if(arrow_array[0].y===110){
              game_vars.gamescreen1=1;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===150){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=1;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.aboutscreen=0;
          }
          if(arrow_array[0].y===230){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.aboutscreen=1;
          }
      }
  }
};

keyReleased = function(){
  keyArray[keyCode]=0;
};

board = new board_sample(320,300);

light = new light_source(200,300);

coin_array.push( new coin(200,360,0));

arrow_array.push( new arrow(100,110,1));
arrow_array.push( new arrow(300,110,-1));

draw = function() {
    
    this.width=400;
    this.height=400;
    if(game_vars.startscreen === 1){
        pushMatrix();
        //translate(300,300);
        background(19, 150, 22);
        board.draw();
        arrow_array[0].draw();
        arrow_array[1].draw();
        coin_array[0].draw();
        light.draw();
        fill(4, 0, 255);
        textSize(30);
        text("TITLE",160,40,300,200);
        text("Game 1 " ,150,100,300,200);
        text("Game 2 " ,150,140,300,200);
        text("Help " ,170,180,300,200);
        text("About " ,160,220,300,200);
        popMatrix();
    }
    if(game_vars.helpscreen === 1){
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
        light.draw();
        popMatrix();


        fill(4, 0, 255);
        textSize(30);
        text("HELP",30,20,300,200);
        textSize(15);
        text("Reversi is a two player board game. Each player controls either the black or the white tile.  The black gets to move first. At any point in the game any square on the 8x8 board can only be occupied by either a tile of one color.",30,50,220,400);
        text("Each turn consists of one player placing one tile of his color in any one of the spaces which allows him to capture his opponent’s tiles. The tiles can be captured vertically, horizontally and diagonally. The above figures show all the legal positions available and how the captured pieces are flipped. The game is played until no position on the board is a legal position for either of the player. If one player at any point in the game does not have a legal move, he must pass. The winner is the player who has the most number of tiles at the end of the game.",30,190,320,400);
        //text("It is a ",30,70,300,200);
        

    }
     
};

}};
