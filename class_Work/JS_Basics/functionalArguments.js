// here we gona learn functional arguments based on an example.
function sum(a,b){
    return a+b;
}
function minus(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function doOperation(a,b,op){
    return op(a,b);
}

console.log(doOperation(1,2,sum)); // here we are passing sum function to doOperation function as an Argument ( this is same done while using readFile ) 