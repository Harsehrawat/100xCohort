"use strict";
// Records ->
// interface User{
//     name : string,
//     age : number
// }
// Initialize an empty Map
const usersMap = new Map();
// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
// Accessing a value using .get
console.log(usersMap.get('abc123'));
