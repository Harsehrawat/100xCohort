
function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms));  
    // instance of promise class declare karenge toh uske 
    // andar functionArgument call karenge jo hume chihye (here setTimeout we want).
}

function callback(){
    console.log("3 seconds have passed");
}


setTimeoutPromisified(3000).then(callback);


// okay , so basically we can say that whatever we passed in argument of setTimeoutPromisified() will be taken in as ms and the other argument that we pass in .then() would be taken as what we are passing in place of resolve 