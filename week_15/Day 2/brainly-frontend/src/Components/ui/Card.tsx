import { DeleteIcon } from "../../icons/Delete"
import { DocumentIcon } from "../../icons/Document"
import { ShareIcon } from "../../icons/Share"
import { YTICON } from "../../icons/YouTube"
import { TwitterIcon } from "../../icons/Tweet"
import { Button } from "./Button"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"

interface CardInterface{
    title : string,
    type : string,
    link : string,
    id : string,
    isGuestView : boolean
}

import { useEffect } from "react";

export function Card({ title, type, link, id, isGuestView }: CardInterface) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const response = await axios.delete(`${BACKEND_URL}/api/delete/content/${id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    });

    alert(response.data.message);
  }

  // 🔁 Load Twitter script when type is Tweet
  useEffect(() => {
    if (type === "Tweet") {
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => console.log("Twitter widgets script loaded");
        document.body.appendChild(script);
      } else {
        // re-render embedded tweet if script already exists
        (window as any).twttr?.widgets?.load();
      }
    }
  }, [type, link]);

  return (
    <div className="bg-white rounded-md border-1 shadow-lg hover:scale-101 transition-transform duration-200 border-black w-72 min-height-48 p-2">
      <div className="flex justify-between items-center m-2">
        <div className="text-gray-500">
          {type === "Youtube" ? <YTICON /> : type === "Tweet" ? <TwitterIcon /> : <DocumentIcon />}
        </div>

        <div className="text-xl underline underline-offset-3 text-black text-center flex-grow flex justify-center">
          {title}
        </div>

        {!isGuestView && (
          <div className="text-gray-500">
            <Button variant="delete" startIcon={<DeleteIcon />} onClick={handleDelete} />
          </div>
        )}
      </div>

      <div className="mt-4 mb-2 ml-2 mr-2 h-fit">
        {type === "Youtube" && (
          <iframe
            className="w-full h-full"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "Tweet" && (
          <blockquote className="twitter-tweet vh-15">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {type === "Document" && (
          <p className="text-blue-500 underline underline-offset-2">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
