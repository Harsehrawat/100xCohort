import { CloseIcon } from "../../icons/Close";
import { Button } from "./Button";
import { Input } from "./Input";

// CreateContentModal component definition
export function CreateContentModal({ open, onClose }) {
   
    return (
        <div>
            {open && (
                // Modal background overlay
                <div>
                    <div className="w-screen h-screen bg-black-700 backdrop-blur-md fixed top-0 left-0  flex justify-center"></div>
                    {/* Modal content container */}
                    <div className="w-screen h-screen fixed  top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-slate-500/30 border backdrop-blur-lg  text-black justiy-end rounded p-2 ">
                                <span className="flex justify-end cursor-pointer" onClick={()=>{onClose(false)}}>
                                    <CloseIcon/>
                                </span>
                                <div>
                                    <Input placeholder="title"/>
                                    <Input placeholder="link"/>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="primary" text="submit"/>
                                </div>
                            </span>
                            

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}