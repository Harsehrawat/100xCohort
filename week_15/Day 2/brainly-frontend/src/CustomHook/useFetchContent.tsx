import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ContentItem{
  _id : string,
  title : string,
  link : string,
  type : string
}

export function useFetchContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username ,setUsername] = useState<string>();

  function refresh(){
    axios // here iam fetching from contentModel , here isud also add var. to fetch unique _id Object for each contentModel data
      .get(`${BACKEND_URL}/api/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setContent(response.data.content || []);
        setLoading(false);
        setUsername(response.data.username);
        console.log(`username received by FE:${response.data.username}`);
        if(response.data.message){
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError("Sever error occured");
        setLoading(false);
      });
  }

  useEffect(() => {
    refresh();

    let interval = setInterval( ()=> {
      refresh()
    },10*1000); // keep refreshing after 10 seconds .

    return ()=>{
      clearInterval(interval);
    }
  }, []);

  return { content, loading, error,username };
}

