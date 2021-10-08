let pairsArray = [];
let entMineArray = [];
let counter=0; 

function startEnt(object){
    //randomly assigns some mines as entangled mines
    RandCell=object[int(random(rows))][int(random(cols))];
    while((entMineCount<int(cols*rows*entMineRatio))){
        if((RandCell.mine==true) && (RandCell.entMine==false)){
            RandCell.entMine=true;
            entMineArray.push(RandCell);
            entMineCount++;
        }
        RandCell=object[int(random(cols))][int(random(rows))];
    }
    twoThree(entMineCount);
}

// break down entangled mine number into an array of 2s and 3s
function twoThree(n){
    while(n>0){
        if(n==4 || n==2){
            pairsArray.push(2);
            n=n-2;
        }else if(n==3){
            pairsArray.push(3);
            n=n-3;
        }else if((floor(random(n)))%2==1){
            pairsArray.push(2);
            n=n-2;
        }else{
            pairsArray.push(3);
            n=n-3;
        }
    } 
}

 // take the array of entangled mines and use the 2/3 array to assign pairs
for(n=0; n<pairsArray.length; n++){
    for(m=0; m<pairsArray[n-1]; m+=n){
        //put the assigned countterparts' information into that entmine
        entMineArray[counter+m].entConnectIndex[m]=(entMineArray[counter+1+m].selfIndex);
        entMineArray[counter+1+m].entConnectIndex[m]=(entMineArray[counter+m].selfIndex);
        if(m==1){//i.e., n==3
            entMineArray[counter].entConnectIndex[m]=(entMineArray[counter+1+m].selfIndex); 
        }
    }
    counter+=n;
}