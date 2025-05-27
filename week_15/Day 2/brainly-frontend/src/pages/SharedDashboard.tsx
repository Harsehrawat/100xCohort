import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TweetDashboard } from "../DashBoard/TweetDashboard"

export function SharedDashboard() {
  const { sharableLink } = useParams(); // extract link param from URL
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false); // to verify successful fetch

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/share/${sharableLink}`);
        // You may store response.data if needed elsewhere
        setIsValid(true);
      } catch (err) {
        setError("Failed to fetch shared content.");
        setIsValid(false);
      }
    }

    fetchData();
  }, [sharableLink]);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="text-center text-white p-4">
        Loading content...
      </div>
    );
  }

  // ✅ Render the same dashboard, but pass isGuestView=true to hide buttons
  return <TweetDashboard isGuestView={true} />;
}

export default SharedDashboard;
