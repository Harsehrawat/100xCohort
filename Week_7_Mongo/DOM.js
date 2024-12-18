let counter = 0;
function addToDo(){
    // back-end wants me to send valid token and the title of todo
    const title = document.querySelector("input").value.trim();
    if(!title){
        alert("Can't enter an empty Task!");
        return;
    }
    
    const token = localStorage.getItem("authToken"); // NOT WORKING -> CREATE FRONTEND FOR SIGN-IN AND STORE TEMP. TOKEN IN LOCALSTORAGE ASSIGNING IT'S NAME TO AUTHTOKEN

}