"use strict";
function sumOfAge(userA, userB) {
    return userA.age + userB.age;
}
const result = sumOfAge({
    name: "Harsh",
    age: 22
}, {
    name: "Uday",
    age: 23
});
console.log(result);
