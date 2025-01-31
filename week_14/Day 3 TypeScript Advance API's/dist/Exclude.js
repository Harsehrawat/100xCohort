"use strict";
//In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.
const handleEvent = (event) => {
    console.log(`Handling event: ${event}`);
};
handleEvent('click'); // OK
