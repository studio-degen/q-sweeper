// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

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
  textSize(8);
  text([this.i,this.j], this.x + this.w * 0.5, this.y + this.w - 6)
  if (this.revealed) {
    if (this.mine) {
      if(this.ra < 0.5){
        fill('red');
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else {
        fill(127);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      }
      
    } 
    else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        textSize(5);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }

      //for tomato-empty&numberTile by Shangshang
      if(this.tomato == false){
        if(this.ra < tompercent){
          fill("red");
          rect(this.x,this.y,10,10);
          tomato = true;
        }
      }
    }
  }

  //flagging function by Apurv;
  if (this.flagged) {
    fill(0, 0, 180);
	circle(this.x + 10, this.y + 10, 5);
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

//for tomato-mineTile by Yiping;
// let ramBooT; 
// let valueM;

// function MineTile(mine){
//   console.log(mine.x);
//   let ra = random(0, 1);
//   if (ra < 0.9) {
//     ramBooT = true;
//   }else{
//     ramBooT = false;
//   }
//   if (ramBooT == true){
//     fill("red");
//     rect(mine.x, mine.y, 10, 10);
//   }
//   if(ramBooT == false){
//     gameOver();
//   }
// }