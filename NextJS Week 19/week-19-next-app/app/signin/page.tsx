"use client"

import axios from "axios";
import { useState } from "react";


export default function Signin(){

    const [username,setusername] = useState(" ");
    const [password,setpassword] = useState(" ");

    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center border p-2">
                <input type="text" placeholder="username" onChange={ e => {setusername(e.target.value)}}></input>
                <input type="text" placeholder="password" onChange={ e => {setpassword(e.target.value)}}></input>
                <button onClick={ ()=>
                    axios.post("/api/v1/signin" ,{
                        username,
                        password
                    })
                 }>Sign in</button>
            </div>

        </div>
    )
}