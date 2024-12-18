const fs = require("fs");   // here we are importing fs library using require in JS

// const contents = fs.readFileSync("/Users/harshsehrawat/Desktop/100xCohort/class_Work/100xCohort/JS_Basics/a.txt","utf-8");  
// console.log(contents);

// const contents2 = fs.readFileSync("/Users/harshsehrawat/Desktop/100xCohort/class_Work/100xCohort/JS_Basics/b.txt","utf-8"); 
// console.log(contents2);
// the above code is synchronous (runs one by one sequentially)

 
// Now will do it Asynchronous way ->{callback}

function print(err,data){
    if(err) console.log("File not found ! checkout the path ")
    else console.log(data);
}

fs.readFile("/Users/harshsehrawat/Desktop/100xCohort/class_Work/100xCohort/JS_Basics/b.txt","utf-8",print);
 // the error for this comes out before o/p for file A as in this it doesn't read the data for file B and saves time 
// ("Guess why b line didn't execute at last !")  


// in this below , guess what will run first ?
function timeout(){
    console.log("Timeout");
}

setTimeout(timeout,1000); // after 1 sec is done , that time the loop would be running so this timeout o/p would be put to callback queue . 

var c = 0;
for(var i= 0;i<10000000;i++){ 
    c = c+1;
}

fs.readFile("/Users/harshsehrawat/Desktop/100xCohort/CLASS_WORK/100xCohort/JS_Basics/a.txt","utf-8",print);

console.log("for-Loop");

// MyFunda -> code me pehle sabhi synchrounous activities run hongi blocking other activities and then all the asysnchronous activites runs based on the thread .

// take-away : 
// Even though fs.readFile for b.txt is called first, the file reading for a.txt might complete faster due to factors like:

// Smaller file size: a.txt might be smaller than b.txt, allowing it to be read quicker.
// Disk I/O: Random disk access might cause a.txt to be fetched faster than b.txt.