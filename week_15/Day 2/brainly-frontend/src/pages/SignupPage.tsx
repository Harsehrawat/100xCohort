import { useRef } from "react";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { data } from "react-router-dom";

export function Signup(){
    const usernameref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    console.log("inside signUp fn")
    
    async function signupHandler(){
        console.log("signUpHandler called")
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;
        await axios.post(`${BACKEND_URL}/api/signup`,{
            data : {
                username ,
                password 
            }
        })
        console.log("passed data")
        
    }

    return <div className="h-100 w-full flex justify-center items-center">
        <div className="bg-white rounded-md text-black border p-2">
            <Input ref={usernameref} placeholder="username"/>
            <Input ref={passwordref} placeholder="password"/>
            <div  className="flex justify-center">
                <Button onClick={signupHandler} variant="primary" text="sign up" italic/>
            </div>
        </div>

    </div>
}