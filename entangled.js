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
    twoThree(entMineCount); // fn call
    pairing(object); //fn call
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

function pairing(object){
    // take the array of entangled mines and use the 2/3 array to assign pairs
    for(n=0; n<pairsArray.length; n++){
        for(m=0; m<pairsArray[n-1]; m+=n){
            //put the assigned countterparts' information into that entmine
            console.log(m);
            console.log(n);
            let cell = entMineArray[counter+m];
            console.log(entMineArray[counter+m].ai,entMineArray[counter+m].aj);
           // entMineArray[counter+m].entConnectIndex[m]=(entMineArray[counter+1+m].selfIndex);
           // entMineArray[counter+1+m].entConnectIndex[m]=(entMineArray[counter+m].selfIndex);
            if(m==0){//i.e., n==2
                [entMineArray[counter+m].ai,entMineArray[counter+m].aj]=[entMineArray[counter+1+m].i,entMineArray[counter+1+m].j];
                [entMineArray[counter+m+1].ai,entMineArray[counter+m+1].aj]=[entMineArray[counter+m].i,entMineArray[counter+m].j];  
            }
            else{//i.e., n==3 m==2
                [entMineArray[counter+m].ai,entMineArray[counter+m].aj]=[entMineArray[counter+1+m].i,entMineArray[counter+1+m].j];
                [entMineArray[counter+m+1].ai,entMineArray[counter+m+1].aj]=[entMineArray[counter+m].i,entMineArray[counter+m].j];
                [entMineArray[counter+m].ai,entMineArray[counter+m].aj]=[entMineArray[counter+1+m].i,entMineArray[counter+1+m].j];
                [entMineArray[counter+m+1].ai,entMineArray[counter+m+1].aj]=[entMineArray[counter+m].i,entMineArray[counter+m].j];
            }
        }
        counter+=n;
    }
}