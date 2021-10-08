let pairsArray = [];
let entMineArray = [];
let counter=0; 

function startEnt(object){
    //randomly assigns some mines as entangled mines
    RandCell=object[int(random(rows))][int(random(cols))];
    while((entMineCount<int(cols*rows*entMineRatio))){
        if((RandCell.mine==true) && (RandCell.entMine==false)){
            RandCell.entMine=true;
            entMineArray.push([RandCell.i,RandCell.j]);
            entMineCount++;
        }
        RandCell=object[int(random(cols))][int(random(rows))];
    }
    twoThree(entMineCount); // fn call
    pairing(object,entMineArray); //fn call
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
function pairing(object,entMineArray){
    //console.log(pairsArray)
    for(n=0; n<pairsArray.length; n++){
        m=pairsArray[n]; 
            if(m==2){ //if it is a pair
                let xIndex1 = entMineArray[counter+0][0];
                let yIndex1 = entMineArray[counter+0][1];
                let xIndex2 = entMineArray[counter+1][0];
                let yIndex2 = entMineArray[counter+1][1];

                [entMineArray[counter+0][2],entMineArray[counter+0][3]]=[entMineArray[counter+1][0],entMineArray[counter+1][1]];
                [entMineArray[counter+1][2],entMineArray[counter+1][3]]=[entMineArray[counter+0][0],entMineArray[counter+0][1]]; 

                object[xIndex1][yIndex1].ai=entMineArray[counter][0];
                object[xIndex1][yIndex1].aj=entMineArray[counter][1];
                object[xIndex2][yIndex2].ai=entMineArray[counter][0];
                object[xIndex2][yIndex2].aj=entMineArray[counter][1];
            }
            else if(m==3){ //if it is a triplet
                let xIndex1 = entMineArray[counter+0][0];
                let yIndex1 = entMineArray[counter+0][1];
                let xIndex2 = entMineArray[counter+1][0];
                let yIndex2 = entMineArray[counter+1][1];
                let xIndex3 = entMineArray[counter+2][0];
                let yIndex3 = entMineArray[counter+2][1];

                [entMineArray[counter+0][2],entMineArray[counter+0][3]]=[entMineArray[counter+1][0],entMineArray[counter+1][1]];
                [entMineArray[counter+1][2],entMineArray[counter+1][3]]=[entMineArray[counter+0][0],entMineArray[counter+0][1]];
                
                [entMineArray[counter+1][4],entMineArray[counter+1][5]]=[entMineArray[counter+2][0],entMineArray[counter+2][1]];
                [entMineArray[counter+2][2],entMineArray[counter+2][3]]=[entMineArray[counter+1][0],entMineArray[counter+1][1]]; 

                [entMineArray[counter+0][4],entMineArray[counter+0][5]]=[entMineArray[counter+2][0],entMineArray[counter+2][1]];
                [entMineArray[counter+2][4],entMineArray[counter+2][5]]=[entMineArray[counter+0][0],entMineArray[counter+0][1]]; 

                object[xIndex1][yIndex1].ai=entMineArray[counter+0][2];
                object[xIndex1][yIndex1].aj=entMineArray[counter+0][3];
                object[xIndex1][yIndex1].bi=entMineArray[counter+0][4];
                object[xIndex1][yIndex1].bj=entMineArray[counter+0][5];

                object[xIndex2][yIndex2].ai=entMineArray[counter+1][2];
                object[xIndex2][yIndex2].aj=entMineArray[counter+1][3];
                object[xIndex2][yIndex2].bi=entMineArray[counter+1][4];
                object[xIndex2][yIndex2].bj=entMineArray[counter+1][5];

                object[xIndex3][yIndex3].aj=entMineArray[counter+2][2];
                object[xIndex3][yIndex3].ai=entMineArray[counter+2][3];
                object[xIndex3][yIndex3].bi=entMineArray[counter+2][4];
                object[xIndex3][yIndex3].bj=entMineArray[counter+2][5];
            }
        counter+=m;
    }
    console.log(entMineArray);
}