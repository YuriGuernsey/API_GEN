import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ManageApi() {
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { apiId } = router.query; // Get API ID from the URL

  useEffect(() => {
    const fetchApiDetails = async () => {
      if (!apiId) return; // If API ID is not yet available, return
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`/api/apis/${apiId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApi(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApiDetails();
  }, [apiId]);

  const deleteAPI = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/apis/${apiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard"); // Redirect back to dashboard after deleting the API
    } catch (error) {
      console.error("Error deleting API", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p>Loading API details...</p>
      ) : api ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{api.name}</h1>
          <p className="text-lg mb-4">{api.schema}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Endpoint:</h2>
            <pre className="bg-gray-200 p-2 rounded">{api.endpoint}</pre>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={deleteAPI}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              Delete API
            </button>
            <button
              onClick={() => router.push(`/dashboard`)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </>
      ) : (
        <p>API not found.</p>
      )}
    </div>
  );
}
