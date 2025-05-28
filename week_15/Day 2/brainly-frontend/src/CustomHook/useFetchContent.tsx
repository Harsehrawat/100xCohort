import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
}

export function useFetchContent(type?: string) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function refresh() {
      try {
        const endpoint = type
          ? `${BACKEND_URL}/api/content/${type}`
          : `${BACKEND_URL}/api/content`;

        console.log(`Fetching from: ${endpoint}`);
        const response = await axios.get(endpoint, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        const data = type ? response.data.contentType : response.data.content;
        if (Array.isArray(data) && data.length === 0) {
          setIsEmpty(true);
        }
        setContent(data || []);
        setUsername(response.data.username);
        setError(response.data.message || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Server error occurred");
        setLoading(false);
      }
    }
    refresh();
    const interval = setInterval(refresh, 10 * 1000); // refresh every 10s
    return () => clearInterval(interval);
  }, [type]);

  return { content, loading, error, username, isEmpty };
}
