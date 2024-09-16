function setContent(content){
    document.getElementById("authForm").innerHTML = content;
}

function showSignInForm(){
    const content = `
    <h3>Sign-In</h3>
    <input type="text" name="signinusername" placeholder="create username"/>
    <input type="text" name="signinpassword" placeholder="create password"/>
    <button id="signinButton" onclick="createSignIn()">Create Account</button>
    `;
    setContent(content);
}

function showLogInForm(){
    const content = `
    <h3>Log-In</h3>
    <input type="text" name = "loginusername" placeholder="enter username"/>
    <input type="text" name="loginpassword" placeholder="enter password"/>
    <button id="loginButton" onclick="createLogIn()">Log-In</button>
    `
    setContent(content);
}

async function createSignIn() {
    //fetch the values from html
    const username = document.querySelector("input[name='signinusername']").value;
    const password = document.querySelector("input[name='signinpassword']").value;
    // pass this to BE.
    const resp = await axios.post("http://localhost:3000/signin",{
        username : username,
        password : password
    })
    const data = resp.data.message;
    alert(data);
    if(data == "signed-in successfully"){
        // show alert and move to the showLogInForm();
        showLogInForm();
    }else{
        showSignInForm();
    }
}

