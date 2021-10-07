function startEnt(){
    //randomly assigns some mines as entangled mines
    RandCell=grid[random(cols)][random(rows)];
    let entMine = [];
    while(entMineCount<int(cols*rows*entMineRatio) && RandCell.mine==true && RandCell.entMine==false){
        RandCell.entMine==true;
        entMine.push(RandCell);
        entMineCount++;

    }

    
}

