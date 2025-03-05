import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/Close";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

// CreateContentModal component definition
export function CreateContentModal({ open, onClose }) {

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType] = useState("");
    const navigate = useNavigate();

    async function addContentHandler(){
        console.log("inside addContentHandler ");

        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token = localStorage.getItem("token");
        if(!title || !link || !type){
            return alert("Title ,link and type can't be empty");
        }
        const response = await axios.post(`${BACKEND_URL}/api/content`, { title , link , type},{ headers : {Authorization : token}});

        try{
            
            if(response.status === 200){
                alert(`${response.data.message}`);
                navigate("/dashboard");
                onClose(false);
                
            }
            else if(response.status===401 || response.status===500 || response.status===400) alert(`${response.data.message}`);
          
        }
        catch(e){
            console.log("error in addContentHandler()"+e);
            alert("server error occured while adding content");
        }
        
    }
   
    return (
        <div>
            {open && (
                // Modal background overlay
                <div>
                    <div className="w-screen h-screen backdrop-blur-md bg-gray-700/30 fixed top-0 left-0  flex justify-center"></div>
                    <div className="w-screen h-screen fixed  top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center ">
                            <span className=" border bg-slate-500/10 backdrop-blur-sm text-black justify-end rounded p-2 ">
                                <span className="flex justify-end">
                                <Button onClick={()=>onClose(false)} variant='close' size='sm' startIcon={<CloseIcon/>} endIcon={""}/>
                                    
                                </span>
                                <div>
                                    <Input ref={titleRef} placeholder="title"/>
                                    <Input ref={linkRef} placeholder="link"/>
                                    <select value={type} 
                                        onChange={ (e)=> setType(e.target.value)} 
                                        className="p-2 w-55 m-3 ml-4 border rounded text-slate-600 cursor-pointer">
                                            <option value="" disabled selected>Select Type</option>
                                            <option value="Youtube">YouTube</option>
                                            <option value="Tweet">Tweet</option>
                                            <option value="Document">Document</option>
                                    </select>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={addContentHandler} variant="secondary" text="submit"/>
                                </div>
                            </span>
                            

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}