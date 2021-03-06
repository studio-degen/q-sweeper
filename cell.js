function Cell(i, j, w /*this part*/) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  //knowledge of entangled counterpart(s)
  this.ai = null //entangled counterpart 1 i
  this.aj = null //entangled conterpart 1 j
  this.bi = null //entangled counterpart 2 i
  this.bj = null //entangled conterpart 2 j
  selfIndex=[i,j]
  entConnectIndex=[[this.ai,this.aj],[this.bi,this.bj]]

  this.mine = false;
  this.entMine = false;
  this.revealed = false;

  //flagging function by Apurv;
  this.flagged = false;
  
  //for tomato-empty&numberTile by Shangshang;
  this.tomato = false;
  this.destroy = false;
  this.ra = random(0,1);
}

Cell.prototype.show = function() {
  stroke(100);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  // textSize(8);
  // text([this.i,this.j], this.x + this.w * 0.5, this.y + this.w - 6)
  if (this.revealed) {
    if (this.mine) {
      //mineImg;
      if(this.entMine){
        image(entMineImg, this.x+0.5, this.y+0.5, 20, 20);
      }
      else
        image(mineImg, this.x+0.5, this.y+0.5, 20, 20);
      //fill(127);
      //ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);      
    } 
    else {
      fill(0);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        //numberImg;
        if(this.neighborCount==1){
          image(n1, this.x+0.5, this.y+0.5, 20, 20);
        } else if (this.neighborCount==2){
          image(n2, this.x+0.5, this.y+0.5, 20, 20);
        } else if (this.neighborCount==3){
          image(n3, this.x, this.y, 20, 20);
        } else if (this.neighborCount==4){
          image(n4, this.x+0.5, this.y+0.5, 20, 20);
        } else if (this.neighborCount==5){
          image(n5, this.x+0.5, this.y+0.5, 20, 20);
        } else if (this.neighborCount==6){
          image(n6, this.x+0.5, this.y+0.5, 20, 20);
        }
        // textAlign(CENTER);
        //fill(0);
        // textSize(10);
        // text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }

      //for tomato-empty&numberTile by Shangshang
      if(this.tomato == false){
        if(this.ra < tompercent){
          //tomatoImg;
          image(tomatoImg, this.x+0.5, this.y+0.5, 20, 20);
          // fill("red");
          // rect(this.x,this.y,10,10);
          tomato = true;
        }
      }
    }
  }

  //flagging function by Apurv;
  if (this.flagged) {
    //flagImg;
    image(flagImg, this.x+0.5, this.y+0.5, 20, 20);
    // fill(0, 0, 180);
	  // circle(this.x + 10, this.y + 10, 5);
  }

  //code for win by Shangshang
  if(winCount==1){//when the last tile is clicked;
    fill("yellow");
    rect(0,0,640,640);
  }
}

Cell.prototype.countMines = function() {
  // if (this.mine) {
  //   this.neighborCount = -1;
  //   return;
  // }
  let total = 0;
  for (let xoff = -1; xoff <= 1; xoff++) {
    let i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (let yoff = -1; yoff <= 1; yoff++) {
      let j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      let neighbor = grid[i][j];
      if (neighbor.mine) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    // flood fill time
    this.floodFill();
  }
}

//reveal entangled mines
Cell.prototype.revealEnt = function(){
  this.revealed = true;
  //set the entangled counterpart(s) to be revealed
  grid[this.ai][this.aj].revealed = true;
  console.log("double")
  if(this.bi){
    grid[this.bi][this.bj].revealed = true;
    console.log("triple")
  }
}

Cell.prototype.floodFill = function() {
  for (let xoff = -1; xoff <= 1; xoff++) {
    let i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (let yoff = -1; yoff <= 1; yoff++) {
      let j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      let neighbor = grid[i][j];
      // Note the neighbor.mine check was not required.
      // See issue #184
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}

// for tomato-mineTile by Yiping;
// let ramBooT; 
// let valueM;

// function MineTile(mine){
//   //console.log(mine.x);
//   let ra = random(0, 1);
//   if (ra < tompercent) {
//     ramBooT = true;
//   }else{
//     ramBooT = false;
//   }
//   if (ramBooT == true){
//     //image(tomatoImg, this.x+0.5, this.y+0.5, 20, 20);
//     // fill("red");
//     // rect(mine.x, mine.y, 10, 10);
//   }
//   if(ramBooT == false){
//     gameOver();
//   }
// }