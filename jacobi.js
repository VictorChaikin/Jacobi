'use strict';
const numbsAfterComa = 4;
let array=[];
let matrixObjects=[];
let valuesObjects=[];
let arrayValues = [];
const accuracy = 0.001;
const accuracyArray=[];
const jacobiTableArray=[];
const zeidelTableArray =[];
function jacobiCanBeApplied(array){
    let mainDiagonalElem,sum,flag=true;

    for(let i=0;i<array.length && flag!==false;i++){
        sum = 0;mainDiagonalElem=0;
        for (let j=0;j<array[i].length;j++) {
            (j===i)?mainDiagonalElem = Number(array[i][j]):sum+=Number(array[i][j]);
        }
        //console.log("Main Elem ="+mainDiagonalElem);
        //console.log("Sum = "+sum);
        if(mainDiagonalElem<=sum){
            flag =false;
            return false;
        }
        accuracyArray.push(sum/mainDiagonalElem);
    }
    console.log("Accuracy array = "+accuracyArray);
    return true;
}
function fillArrays(matrixObjects){
    let empty = false;
    for(let i=0;i<matrixObjects.length && empty!== true;i++){
        for(let j=0;j < matrixObjects[i].length && empty!== true;j++){
            if(document.getElementById(matrixObjects[i][j].id).value === matrixObjects[i][j].value){
                empty = true;
            }
        }
    }
    for (let i=0;i<valuesObjects.length && empty!==true;i++){
        if(document.getElementById(valuesObjects[i].id).value === valuesObjects[i].value){
            empty = true;
        }
    }
    if(empty===false){
        for(let i=0;i<matrixObjects.length;i++){
            let subArr =[];
            for (let j=0;j<matrixObjects[i].length;j++){
                subArr.push(document.getElementById(matrixObjects[i][j].id).value);
            }
            array.push(subArr);
        }
        arrayValues = valuesObjects.map((i)=>document.getElementById(i.id).value);
        console.log("Values = "+arrayValues);
        console.log("Array = "+array);
        for(let i=0;i<array.length;i++){
            for(let j=0;j<array[i].length;j++){
                console.log("I = "+i+"  J = "+array[i][j]);
            }
        }
        if(jacobiCanBeApplied(array) === true){
            createTableArray();
        }
        else{
            console.log("Jacobi can`t be applied !!!");
        }
    }
    return empty;
}
function createElem(name,id,type) {
    let last = document.getElementById('last');
    if(name === "DIV"){
        let localDiv = document.createElement("DIV");
        localDiv.innerHTML =id+" = ";
        document.body.insertBefore(localDiv,last);
    }
    else{
        let input = document.createElement(name);
        input.type = type;
        input.id = id;
        document.body.insertBefore(input,last);
    }
}
function drawMatrix(N){
    for (let i=0;i<N;i++){
        let matrixDivArray=[];
        for (let j=0;j<N;j++){
            createElem("DIV","X"+i+j);
            createElem("INPUT","INPUT"+i+j,"number");
            matrixDivArray.push({id:"INPUT"+i+j, value:""});
            //console.log("Div Array"+matrixDivArray);
        }
        createElem("DIV","B"+i);
        createElem("INPUT","INPUT"+i+N,"number");
        valuesObjects.push({id:"INPUT"+i+N,value:""});
        matrixObjects.push(matrixDivArray);
    }

    let div = document.createElement("div");
    div.innerHTML = "<input type='submit' value='SUBMIT' onclick='fillArrays(matrixObjects)'>";
    document.body.insertBefore(div,last);
    //console.log("OBjects = "+matrixObjects);
}

function findX(index) {
    let X=0;
    for(let i=0;i<array.length;i++){
        if(index !==i){
            X-= array[index][i]*jacobiTableArray[jacobiTableArray.length-1][i];
        }
    }
    return (X+Number(arrayValues[index])) *(1/array[index][index]).toFixed(numbsAfterComa);
}
function findMax(array) {
    let max=0;
    for (let i=0;i<array.length;i++) {
        if(Math.abs(array[i])>max)
            max=Math.abs(array[i]);
    }
    return max;
}
function findFirstElem() {
    let firstElem = arrayValues.map((elem,index)=>{
        return (elem / array[index][index]);
    });
    firstElem.push(" - ");
    jacobiTableArray.push(firstElem);
    zeidelTableArray.push(firstElem);
    //console.log(firstElem);
}
function output(array) {
    for(let i=0; i<array.length; i++){
        let output = " Iteration #"+i;
        for(let j=0; j<array[i].length; j++){
            if(j!==array[i].length-1){
                output+=" X"+j +"  = "+array[i][j];
            }
            else{
                output+=" Pohubka = "+array[i][j];
            }
        }
        console.log(output);
        console.log("//////////////////////////////////");
    }
}
function createTableArray(){
    findFirstElem();
    let max=findMax(accuracyArray);
    let jacobiInfelicity=100;
    do{
        let jacobiInfArray = [];
        let currentJacobiTableRow = [];

        for(let i=0;i<array.length;i++){
            currentJacobiTableRow.push(findX(i));
        }
        jacobiInfArray = currentJacobiTableRow.map((i,index)=>jacobiTableArray[jacobiTableArray.length-1][index]-i);
        jacobiInfelicity = (max/(1-max))*findMax(jacobiInfArray);
        currentJacobiTableRow.push(jacobiInfelicity);
        jacobiTableArray.push(currentJacobiTableRow);

    }while(jacobiInfelicity>accuracy);
    console.log("Jacobi Table Array ");
    output(jacobiTableArray);
}
// jacobiCanBeApplied(array);
// createTableArray();


