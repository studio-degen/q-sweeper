// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let grid;
let w = 20;
let cols = 32;
let rows = 32;
let mineRatio = 0.106;
let entMineRatio = 0.025;
let RandCell;
let entMineCount = 0; //keeps track of ent mines count 
let totalMines = 104;
let marginVal=1; //just for increasing canvas margin by 1px

function setup() {
  createCanvas(rows*w+marginVal, cols*w+marginVal);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalMines spots
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }


  for (let n = 0; n < totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].mine = true;
  }


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
  startEnt(grid);
}
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}
function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (grid[i][j].mine) {
          if(frid[i][j].entMine){
            grid[i][j].revealEnt();
          }
          grid[i][j].reveal();
          gameOver();
        }

      }
    }
  }
}
function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}