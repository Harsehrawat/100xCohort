import { useRef } from "react";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { data, Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../icons/HomeLogo";
import { GithubIcon } from "../icons/Github";
import { LinkedIcon } from "../icons/Linked";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signupHandler(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            const response = await axios.post(`${BACKEND_URL}/api/signup`,{ username , password});
            if(response.status === 200){
                alert(`${response.data.message}, you can now login to your account`)
                // navigate to loginPage
                navigate("/signin");
            } 
            else if(response.status === 403) return alert(`${response.data.message}`);
        }catch(e: any){
            alert(`${e.response?.data?.message}` || "signup failed");
        }
        
    }
        

    return <div className="h-screen w-full grid grid-cols-2 bg-linear-65 from-yellow-500 to-orange-600">
    {/* Left Section */}
    <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-md text-black border p-4">
            <p className="flex justify-center font-bold"> Create Your Free Account </p>
            <Input ref={usernameRef} placeholder="Username" variant="login/signin"/>
            <Input ref={passwordRef} placeholder="Password" type="password" variant="login/signin" />
            <div className="flex justify-center m-1">
                <Button onClick={Signup} variant="primary" text="Create Account" italic />
            </div>
            <p className="text-xs text-center m-2 ">
                Already have an Account ?{" "}
                <Link to="/signin" className="text-blue-600 underline cursor-pointer">
                    Click to Login 
                </Link>
            </p>
        </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col items-center text-center p-8 mt-20 space-y-4">
        <HomeIcon />
        <p>
            <strong>Second Brain</strong> is created with love, passion, and dedication to make a useful 
            software for people to use in their daily life.
        </p>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-black font-bold underline underline-offset-8">
            <strong>Connect With Developer</strong> 
        </p>

        <div className="flex flex-row gap-4 mt-2">
            <a href="https://github.com/harsehrawat" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 transition duration-300 transform hover:scale-110 hover:text-white">
                <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/harsh-sehrawat-308793292/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 transition duration-300 transform hover:scale-110 hover:text-white">
                <LinkedIcon />
            </a>
        </div>
        </div>
    </div>
</div>
}