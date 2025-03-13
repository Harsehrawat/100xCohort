import { TwitterIcon } from "../../icons/Tweet";
import { YTICON } from "../../icons/YouTube";
import { DocumentIcon } from "../../icons/Document";
import { Button } from "./Button";
import { div } from "framer-motion/client";
import { useState } from "react";

export function SideBarItem() {
    const [activeCategory , setActiveCategory] = useState<string>("");

    function handleCategory( category : string){
        setActiveCategory(category);
        fetchCategoryData(category);
    }

    function fetchCategoryData(category : string){
        // ToDo : BACKEND API To return data based on type of category
    }


  return (
    <div className="flex flex-col items-center ">
        <div className="pb-10 pt-5">
            <p className="text-black font-medium underline underline-offset-8">Category</p>
        </div>
        <div className="p-5 w-full">
            <ul className="flex flex-col gap-4">
            <li>
                <Button
                onClick={ ()=> handleCategory("Tweet")}
                variant={activeCategory==="Tweet" ? "active-category" : "category"}
                text="Tweets"
                startIcon={<TwitterIcon />}
                />
            </li>
            <li>
                <Button
                    onClick={ ()=> handleCategory("YouTube")}
                    variant={activeCategory === "YouTube" ? "active-category" : "category"}
                    text="YouTube"
                    startIcon={<YTICON />}
                />
            </li>
            <li>
                <Button
                    onClick={ ()=> handleCategory("Document")}
                    variant={activeCategory==="Document" ? "active-category" : "category"}
                    text="Documents"
                    startIcon={<DocumentIcon />}
                />
            </li>
        </ul>
        </div>
    </div>
  );
}
