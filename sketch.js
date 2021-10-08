// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let grid;
let w = 20;
let cols = 32;
let rows = 32;
let marginVal=1; //just for increasing canvas margin by 1px
let mineRatio = 0.106;
let entMineRatio = 0.025;
let RandCell;
let entMineCount = 0; //keeps track of ent mines count 
let totalMines;

let qindex = getRandomInt(25);
let qindex2 = getRandomInt(25);
let qdata, qdata2;
let qkey = []; 
let qvalue = [];
let qshots = [];
let qdict = {};

let qtomval = [];
let tompercent;

function preload() {
  qdata = loadJSON(`./q-data/bvlima-${qindex}`+ '.json'); //${qindex}
  qdata2 = loadJSON(`./q-data/bvlima-${qindex2}`+ '.json');
}

function setup() {
  console.log(qdata);
  createCanvas(rows*w+marginVal, cols*w+marginVal);

  for(var q=0; q<8; q++){
    qkey.push(qdata.totals[q][0]);
    qvalue.push(qdata.totals[q][1]);
    qtomval.push(qdata2.totals[q][1]);
  }

  for(var q=0; q<1024; q++){
    qshots.push(qdata.shots[q]);
  }
  console.log(qshots.length);
  qkey.forEach((key, i) => qdict[key] = qvalue[i]);
  //console.log(qdict);
  qvalue.sort(function(a, b){return b - a});
  qtomval.sort(function(a, b){return b - a});
  console.log(qtomval);
  let minekey = getKeyByValue(qdict, qvalue[1]);

  let tomv = (qtomval[5] / qtomval[0]) * 100;
  tompercent = nfc(tomv/100, 2);
  console.log(tompercent);

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
  //console.log(options);

  let minearray = [];
  for (let n = 0; n < options.length; n++) {
    let index;
    if(qshots[n] == minekey) {
      index = n;  
      let choice = options[index];
      minearray.push(choice);
      //console.log(choice);
      let i = choice[0];
      let j = choice[1];
      //console.log(i, j); 
      // Deletes that spot so it's no longer an option
      options.splice(index, 1);
      grid[i][j].mine = true;
      
    } 

  }


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }

  totalMines = minearray.length;
  console.log(totalMines)
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
function mousePressed(){
  //change mousePressed to keyReleased;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].mine) {
            //for tomato-mineTile by Yiping;
            //MineTile(grid[i][j]);
            if(grid[i][j].entMine){
              grid[i][j].revealEnt();
            }
            else{
              gameOver();
            }
          }

        }
      }
  }
}
//flagging function by Apurv;
function keyReleased() {
  if (key === 'f' || key === 'F') {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].flagged = !grid[i][j].flagged;
          return false;
        }
      }
    }
  }
  
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => 
          object[key] === value);
  }