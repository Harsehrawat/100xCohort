var firstName = "harsh";
console.log(firstName);

// in js , i can change the var to any datatype

firstName = 7;
console.log(firstName);

var age = 20;
var canVote = (age>18); // true/false
console.log(canVote);


// working with function creation .
function Vote(age){
    if(age>=18) console.log("you can vote");
    else console.log("you can not vote");
}

Vote(19);

// concept and way of writing loop code is same as java 

// objects in js == maps in c++ == hashmaps in java 
// arrays in js == arrays in c++ == arraylist in java  
 // assign1 -> write a fn user that takes user as input and greets with their names and age .
function greet(name, age){
    console.log("hello ,"+name+"("+age+")");
}

let user = {
    Username : "Harsh",
    age : 22
}

greet(user.Username,user.age);


// assignment -> create a fn that takes an array of objects as input and returns the users with age>19 and gender=male

function fn(user) {
    // Check if the user is an object and has the required properties
    if (typeof user === "object" && user.age > 18 && user.gender === "male") {
        console.log(user.name);
    }
}

var array = [
    {
        name: "Harsh",
        age: 22,
        gender: "male"
    },
    {
        name: "Udit",
        age: 17,
        gender: "male"
    },
    "harshit",
    "tinku"
];

for (let i = 0; i < array.length; i++) {
    fn(array[i]);
}


