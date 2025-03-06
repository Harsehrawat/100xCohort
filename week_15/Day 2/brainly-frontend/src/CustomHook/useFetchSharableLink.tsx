import { useState } from "react";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

export function useFetchSharableLink() {
  const [link, setLink] = useState("");  // State to store the generated link
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLink = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/share/content`,
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setLink(response.data.message); // Store generated link
      alert(FRONTEND_URL+response.data.message);
    } catch (err) {
      console.error("Error generating link:", err);
      setError("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { link, error, loading, fetchLink }; // Return link & function to fetch
}
