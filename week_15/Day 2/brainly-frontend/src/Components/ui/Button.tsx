import { ReactElement } from "react";
import './../../index.css'

interface ButtonProps {
    variant : "primary" | "secondary" | "close" | "delete" |"category" | "active-category";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon : any;
    endIcon : any;
    onClick? : ()=> void
    italic? : boolean
}

const variantStyle = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-transform duration-200",
    "secondary" : "bg-purple-200 text-purple-500 hover:bg-purple-300 hover:scale-105 transition-transform duration-200",
    "close" : "hover:scale-105 transition-transform duration-200",
    "delete" : "hover:scale-105 transition-transform duration-200 hover:text-black",
    "category": "font-medium px-4 py-2 hover:underline underline-offset-4 hover:scale-105 transition-all duration-300 ease-in-out",
    "active-category": "font-medium px-4 py-2 underline underline-offset-4 scale-105 transition-all duration-300 ease-in-out"
}

const defaultStyle = " flex items-center gap-2 rounded-md pr-2 pl-2 cursor-pointer text-xs " ;

const sizeStyle = {
    "sm" : "py-1 px-2",
    "md" : "py-1 px-3",
    "lg" : "py-2 px-4"
}

export const Button =(props : ButtonProps)=>{

    return (
        <button 
          onClick={props.onClick} 
          className={`p-1 cursor-pointer ${variantStyle[props.variant]} ${defaultStyle} ${sizeStyle[props.size]} ${props.italic? "italic" : ""}`}
        >
          {props.startIcon} {props.text} {props.endIcon}
        </button>
      );
      
}

