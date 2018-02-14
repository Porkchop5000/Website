var myRandom = Math.random();
var colB =[];//column B
var colBRandom;
for (var i=0; i<5; i++){
 
 do {
 colBRandom = Math.floor(Math.random()*15+1); }
 while (dupNumber(colB, colBRandom));
 
 colB[i]=colBRandom;
}
console.log(colB);

var colI =[];//column I 
var colIRandom;
for (var i=0; i<5; i++){
 
 do {
 colIRandom = Math.floor(Math.random()*29+1); }
 while ((dupNumber(colI, colIRandom)) || (colIRandom < 16));
 
 colI[i]=colIRandom;
}
console.log(colI);

var colN =[];//column N 
var colNRandom;
for (var i=0; i<5; i++){
 
 do {
 colNRandom = Math.floor(Math.random()*44+1); }
 while ((dupNumber(colN, colNRandom)) || (colNRandom < 31));
 
 colN[i]=colNRandom;
}
colN[2]="Free Space";
console.log(colN);

var colG =[];//column G 
var colGRandom;
for (var i=0; i<5; i++){
 
 do {
 colGRandom = Math.floor(Math.random()*59+1); }
 while ((dupNumber(colG, colGRandom)) || (colGRandom < 46));
 
 colG[i]=colGRandom;
}
console.log(colG);

var colO =[];//column O 
var colORandom;
for (var i=0; i<5; i++){
 
 do {
 colORandom = Math.floor(Math.random()*75+1); }
 while ((dupNumber(colO, colORandom)) || (colORandom < 61));
 
 colO[i]=colORandom;
}
console.log(colO);

//This function checks that there is no duplicated number before adding that number to the column
function dupNumber(column, number){
 var dup = false;
 var i=0;
 do {
 if (column[i]===number)
 dup = true;
 else
 i++;
 } while (!dup && i < column.length);
 return dup;
}