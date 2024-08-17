// {PTR} setTimeout(functionalArgument,time)  -> This is the structure of setTimeOut .

// Q: Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

// setTimeout(function(){
//     console.log("hi");
//     setTimeout(function(){
//         console.log("hello");
//         setTimeout(function(){
//             console.log("hello there");
//         },5000);
//     },3000);
// },1000);        // this is done by digging into basic defination more and more , causing callback hell .{think of a more better way to write same }

// now trying do so using promise .

function setTimeoutPromisified(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function step1(){
    console.log("hi");
    setTimeoutPromisified(3000).then(step2);
}

function step2(){
    console.log("hello");
    setTimeoutPromisified(5000).then(step3);
}

function step3(){
    console.log("hello there");
}

setTimeoutPromisified(1000).then(step1);

