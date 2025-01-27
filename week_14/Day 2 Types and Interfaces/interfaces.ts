// create a User interface containing name , age , address as city , state , country
// create an object for this User interface and determine if user can vote or not.

// step : 1-> creating user interface

interface Users {
    name : string,
    age : number,
    address : {
        city : string,
        state : string,
        country : string
    }
}


// create an object accessing this inteface blueprint

let user : Users = {
    name : "Harsh",
    age : 22,
    address : {
        city : "Dharuhera",
        state : "Haryana",
        country : "India",
    }
}

function verify( user : Users) : boolean{
    if(user.age >17 && user.address.country=="India") return true;
    return false;
}

console.log(verify(user))


