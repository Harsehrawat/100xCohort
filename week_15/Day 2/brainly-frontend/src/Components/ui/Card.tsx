import { DeleteIcon } from "../../icons/Delete"
import { DocumentIcon } from "../../icons/Document"
import { ShareIcon } from "../../icons/Share"
import { YTICON } from "../../icons/YouTube"
import { TwitterIcon } from "../../icons/Tweet"
import { Button } from "./Button"

interface CardInterface{
    title : string,
    type : string,
    link : string
}

export function Card({title , type , link} : CardInterface){
    return <div className="bg-white rounded-md border-1 shadow-lg hover:scale-101 transition-transform duration-200 border-black w-72 min-height-48 p-2">
        
        <div className=" flex justify-between items-center m-2">
    
            <div className="text-gray-500">
                {type === "Youtube" ? <YTICON /> : type === "Tweet" ? <TwitterIcon /> : <DocumentIcon />}
            </div>

            <div className="text-xl underline underline-offset-3 text-black text-center flex-grow flex justify-center">
                {title}
            </div>

            <div className="text-gray-500">
                <Button variant="delete" startIcon={<DeleteIcon />} />
            </div>
        </div>

        <div className="mt-4 mb-2 ml-2 mr-2 h-fit">
            {type === "Youtube" && <iframe className="w-full h-full" src={link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            {type === "Tweet" && <blockquote className="twitter-tweet vh-15">
            <a href={link.replace("x.com","twitter.com")}></a> 
            </blockquote>}
            {type === "Document" && <p className="text-blue-500 underline underline-offset-2">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            </p>}
            
        
        </div>
        
    </div>
}