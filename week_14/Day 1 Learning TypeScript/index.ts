// Function to greet a user by printing a message with their name and age
function wish(user: {
    name: string; 
    age: number 
    }) {
    // Log a greeting message with the user's name and age
    console.log(`Hello ${user.name}, you are ${user.age} years old.`);
}

// Calling the greet function with an object that has the name "Harsh" and age 22
wish({
    name: "Harsh",  // User's name
    age: 22,         // User's age
});

let user = {
    name: "Harsh Sehrawat",  // User's name
    age: 23,            // User's age
};

// Calling the greet function with the user object
wish(user);