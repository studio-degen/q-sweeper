// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E


function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid,rows,cols;
let w = 10;
let mineRatio = 0.106;
let entMineRatio = 0.025;
let RandCell;
let totalMines = 104;


function setup() {
  cols=32; 
  rows=32;
  createCanvas(321, 321);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  startEnt();

  // Pick totalMines spots
  // options is an array with all cell locations
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  //cycle through total num of mines
  for (let n = 0; n < totalMines; n++) {
    //instead determined by q data
    //index is a raondom numbner capped at the number of cells
    let index = floor(random(options.length));
    //choice is the cell at the random number
    let choice = options[index];
    //i is the column num of the cell
    let i = choice[0];
    //j is the row num of the cell
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);

    //the cell at the location on the grid is marked as a mine
    grid[i][j].mine = true;
  }


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }

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
          if(grid[i][j].entMine){
            //reveal that entangled mine's counterpart
            grid[i][j].revealEnt();
          }else{
            grid[i][j].reveal();
            gameOver();
          }
        }else{
          grid[i][j].reveal();
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