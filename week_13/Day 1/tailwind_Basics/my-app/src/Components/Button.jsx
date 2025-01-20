import { useState } from "react"

export const Button =({
    intialText,finalText
})=>{
    const [isClicked,setIsClicked] = useState(false);

    return(
        <span onClick={()=>{setIsClicked(true)}} className={`rounded-2xl text-4xl px-14 py-4 text-white ${
            isClicked ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {isClicked ? finalText : intialText}
        </span>
    )

}