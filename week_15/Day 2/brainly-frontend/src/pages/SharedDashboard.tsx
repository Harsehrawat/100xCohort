import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function SharedDashboard() {
  const { sharableLink } = useParams(); // Get the link from URL
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      
    }
    fetchData();
  }, [sharableLink]);


  return (
    <div>
      Navigated to SharedLink Page !
    </div>
  );
}

export default SharedDashboard;
