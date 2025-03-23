import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useFetchSharableLink } from "../CustomHook/useFetchSharableLink";

export function SharedDashboard() {
  const { sharableLink } = useParams(); // Get the link from URL
  const [data, setData] = useState(null);
  const [error, setError] = useState<string|null>(null);

  useFetchSharableLink();

  useEffect(() => {
    // first verify the link ....

    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/share/${sharableLink}`);
        setData(response.data); // Store full response data
      } catch (err) {
        setError("Failed to fetch shared content.");
      }
    }

    fetchData();
  }, [sharableLink]);

  return (
    <div>
      <h2>Navigated to SharedLink Page!</h2>

      {/* Show error message if API fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display fetched data */}
      {data ? (
        <div>
          <h3>Shared by: {data.username}</h3>
          <ul>
            {data.content.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> - {item.type}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !error && <p>Loading content...</p>
      )}
    </div>
  );
}

export default SharedDashboard;
