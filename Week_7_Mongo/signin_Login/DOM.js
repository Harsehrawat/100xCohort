async function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // now communicate w/ back-end
    try{
        const response = await axios.post('http://localhost:3000/signup',{
            username : username,
            password : password
        });
        if(response.data==1){
            alert("sign-in successfull! Log-in using same credentials to access website");
            // FTA -> after alert.. my sign-in credentials should disappear for re-entering for log-in
        }
        else{
            alert("this username is already in use");
        }
    }
    catch(error){
        console.log(error);
        alert("sign-in failed");
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // communicating w/ backedn
    try{
        const response = await axios.post("http://localhost:3000/signin",{
            username : username,
            password : password
        });
        const token = response.data.token;
        if(!token){
            alert(response.data.message);
        }
        else{
            localStorage.setItem("authToken",token);
            // now re-direct logged-in user to the todo Website
            window.location.href = "/Users/harshsehrawat/Desktop/100xCohort/class_Work/Week_7_Mongo/frontEnd.html";
        }
    }
    catch(error){
        console.log(error);
        alert("Log-in Failed due to some unknown reason");
    }
}

