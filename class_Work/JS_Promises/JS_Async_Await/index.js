// write a promise code using async and await to print hi , hello and hello there 1,3 and 5 seconds later resp.

function setTimeoutPromisified(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function solve() {
    await setTimeoutPromisified(1000);  // ye normal promise nahi hai as in normal promise resolve used to identify the fn jisme use jaaana hai by the syntax {setTimeoutPromisified(time).then(callback)}
                                        // isme to sirf time hai , toh resolve kuch nahi kar raha , time ke acc. setToutPromsified wait kr rha h and then solve mehtod ki next line par move kar ja raha hai .
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("hello there");
}

solve();


// unlike callback where err first back approach is used to propogate back to err , in promises we use reject argument to propogate back to err.
const fs = require("fs");

function print(err,data){
    if(err) console.log("error");
    else console.log(data);
}

fs.readFile("a.txt","utf-8",print);

// below is promise using reject argument
function readFilePromisified(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf-8", function (err, data) {
      if (err) {
        reject("Error while reading file");
      } else {
        resolve(data);
      }
    });
  });
}

function onDone(data) {
  console.log(data);
}

function onError(err) {
  console.log("Error: " + err);
}

readFilePromisified("a.txt").then(onDone).catch(onError);
