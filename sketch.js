// modified from minesweeper greybox by Dan Shiffman from video: https://youtu.be/LFU5ZlrR21E

let grid;
let w = 20;
let cols = 32;
let rows = 32;
let marginVal = 1; //just for increasing canvas margin by 1px
let entMineRatio;
let RandCell;
let entMineCount = 0; //keeps track of ent mines count 
let totalMines;
let totalFlags;
let showFlags;

let qindex = getRandomInt(25);
let qindex2 = getRandomInt(25);
let qindex3 = getRandomInt(25);
let qdata, qdata2, qdata3;
let qkey = []; 
let qvalue = [];
let qshots = [];
let qdict = {};

let qtomval = [];
let tompercent;

let qentval = [];

let flagArray = [];

//img assets created by Yiping and Hyacinth
//img code by Shangshang
let n1,n2,n3,n4,n5,n6;
let flagImg, mineImg, tomatoImg;


function preload() {
  qdata = loadJSON(`./q-data/bvlima-${qindex}`+ '.json'); //${qindex}
  qdata2 = loadJSON(`./q-data/bvlima-${qindex2}`+ '.json');
  qdata3 = loadJSON(`./q-data/bvlima-${qindex3}`+ '.json');

  //img assets created by Yiping and Hyacinth
  //img code by Shangshang
  n1 = loadImage('assets/Q-Jam/1.jpg');
  n2 = loadImage('assets/Q-Jam/2.jpg');
  n3 = loadImage('assets/Q-Jam/3.jpg');
  n4 = loadImage('assets/Q-Jam/4.jpg');
  n5 = loadImage('assets/Q-Jam/5.jpg');
  n6 = loadImage('assets/Q-Jam/6.jpg');
  flagImg = loadImage('assets/Q-Jam/flag.jpg');
  mineImg = loadImage('assets/Q-Jam/mine2.jpg');
  tomatoImg = loadImage('assets/Q-Jam/tomato2.jpg');
}

function setup() {
  //console.log(qdata);
  createCanvas(rows*w+marginVal, cols*w+marginVal);

  // make arrays from qdata json files
  for(var q=0; q<8; q++){
    qkey.push(qdata.totals[q][0]);
    qvalue.push(qdata.totals[q][1]);
    qtomval.push(qdata2.totals[q][1]);
    qentval.push(qdata3.totals[q][1]);
  }

  for(var q=0; q<1024; q++){
    qshots.push(qdata.shots[q]);
  }
  console.log(qshots.length);
  qkey.forEach((key, i) => qdict[key] = qvalue[i]);
  //console.log(qdict);
  qvalue.sort(function(a, b){return b - a});
  qtomval.sort(function(a, b){return b - a});
  //console.log(qtomval);

  qentval.sort(function(a, b){return b - a});
  console.log(qentval);

  let minekey = getKeyByValue(qdict, qvalue[1]);

  // caculate percentage of tomatoes from qdata
  let tomv = (qtomval[4] / qtomval[0]) * 100;
  tompercent = nfc(tomv/100, 3);
  console.log(tompercent);

  let entv = (qentval[5] / qentval[0]) * 100;
  entMineRatio = nfc(entv/100, 3);
  console.log(entMineRatio);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //an array with all the i,j positions on the grid
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

  //keeps track of whether the cell is a mine and how many mines are around the cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
      //console.log(grid[i][j].mine);
    }
  }

  totalMines = minearray.length;
  totalFlags = totalMines;
  console.log(totalFlags);
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
            MineTile(grid[i][j]);

            //displays entangled mines when present
            if(grid[i][j].entMine){
              grid[i][j].revealEnt(); 
            } 
            //gameOver();
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
          if (!grid[i][j].flagged) {
            flagArray.push(1);
          } else {
            flagArray.splice(0, 1);
          }
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
  showFlags = document.querySelector('#qcount-num');
  showFlags.innerText = totalFlags - flagArray.length;
  //console.log(flagArray);
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => 
          object[key] === value);
  }