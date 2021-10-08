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

//grouping the entangled mines together
function pairing(object){
    //console.log(pairsArray)
    for(n=0; n<pairsArray.length; n++){
        m=pairsArray[n]; 
            let cell = entMineArray[counter]; //counter traverses through entMineArray
            if(m==2){ //if it is a pair
                [entMineArray[counter+0].ai,entMineArray[counter+0].aj]=[entMineArray[counter+1].i,entMineArray[counter+1].j];
                [entMineArray[counter+1].ai,entMineArray[counter+1].aj]=[entMineArray[counter+0].i,entMineArray[counter+0].j];  
                //console.log("paired");
            }
            else if(m==3){ //if it is a triplet
                [entMineArray[counter+0].ai,entMineArray[counter+0].aj]=[entMineArray[counter+1].i,entMineArray[counter+1].j];
                [entMineArray[counter+1].ai,entMineArray[counter+1].aj]=[entMineArray[counter+0].i,entMineArray[counter+0].j];
                
                [entMineArray[counter+1].ai,entMineArray[counter+1].aj]=[entMineArray[counter+2].i,entMineArray[counter+2].j];
                [entMineArray[counter+2].ai,entMineArray[counter+2].aj]=[entMineArray[counter+1].i,entMineArray[counter+1].j];
                
                [entMineArray[counter+0].ai,entMineArray[counter+0].aj]=[entMineArray[counter+2].i,entMineArray[counter+2].j];
                [entMineArray[counter+2].ai,entMineArray[counter+2].aj]=[entMineArray[counter+0].i,entMineArray[counter+0].j];
                //console.log("triplet");
            }
        counter+=m;
    }
}