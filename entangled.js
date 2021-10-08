function startEnt(){
    //randomly assigns some mines as entangled mines
    RandCell=grid[random(cols)][random(rows)];
    let entMineArray = [];
    while(entMineCount<int(cols*rows*entMineRatio) && (RandCell.mine==true) && (RandCell.entMine==false)){
        RandCell.entMine==true;
        entMineArray.push(RandCell);
        entMineCount++;

    }
    console.log(entMineCount)

    // break down entangled mine number into an array of 2s and 3s
    // take the array of entangled mines and use the 2/3 array to assign pairs
    // use the 2/3 numbeer to grab thhat number of tthings in the enttmine array, add that number to a counter, the next 2/3 number startts from the counter index
    // the first thing in hte entmine array that is grabbed by the 2/3 array takes the indexes from the next n-1 numeber of array items 
    // if n-1 = 1, put it into this.ai and this.aj
    // if n-1 = 2, put first into this.ti and this.tj, second into this.bi and this.bj
    
}

// revealEnt is in cell.js
