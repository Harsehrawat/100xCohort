
function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms));  
    // instance of promise class declare karenge toh uske functionalArgument
    // ke andar function call karenge jo hume chihye (here setTimeout we want).
}

function callback(){
    console.log("3 seconds have passed");
}


setTimeoutPromisified(3000).then(callback);


