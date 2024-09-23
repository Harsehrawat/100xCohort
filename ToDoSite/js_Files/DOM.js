function setContent(content){
    document.getElementById("authForm").innerHTML = content;
}

function showSignUpForm(){
    const content = `
    <h3>Sign-In</h3>
    <input type="text" name="signupusername" placeholder="create username"/>
    <input type="text" name="signuppassword" placeholder="create password"/>
    <button id="signinButton" onclick="verifySignUp()">Create Account</button>
    `;
    setContent(content);
}

function showLogInForm(){
    const content = `
    <h3>Log-In</h3>
    <input type="text" name = "loginusername" placeholder="enter username"/>
    <input type="text" name="loginpassword" placeholder="enter password"/>
    <button id="loginButton" onclick="verifyLogIn()">Log-In</button>
    `
    setContent(content);
}

async function verifySignUp() {
    //fetch the values from html
    const username = document.querySelector("input[name='signupusername']").value;
    const password = document.querySelector("input[name='signuppassword']").value;
    // pass this to BE.
    const resp = await axios.post("http://localhost:3000/signup",{
        username : username,
        password : password
    })
    const data = resp.data.message;
    alert(data);
    if(data == "account created , now you can login"){
        // show alert and move to the showLogInForm();
        showLogInForm();
    }else{
        showSignUpForm();
    }
}

async function verifyLogIn() {
    // user will pass us username and password
    const username = document.querySelector("input[name='loginusername']").value;
    const password = document.querySelector("input[name='loginpassword']").value;
    // fetch repsonse from BE
    const resp = await axios.post("http://localhost:3000/login",{
        username : username,
        password : password
    })
    const message = resp.data.message;
    const token = resp.data.token;
    if(token==null){
        // error in login 
        alert(message);
        showLogInForm();
    }
    else{
        localStorage.setItem("token",token);
        getTodo();
    }
}

async function getTodo() {
    // call the BE API
    const resp = axios.get("http://localhost:300/get_todos",{
        Headers : {
            token : localStorage.getItem("token")
        }
    })
}
