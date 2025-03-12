"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../../components/Layout";
import CreateApi from "../../components/CreateApi"; 
import { useRouter } from "next/navigation"; // Make sure you're using the correct hook for App Router



export default function Dashboard() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleApiCreated = (newApiKey: string) => {
    setApiKey(newApiKey);
  };
  useEffect(() => {
    const fetchApis = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("/api/apis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApis(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApis();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Please log in first.");
      router.push("/auth/signin"); // Redirect to the login page if no token
      return;
    }

    // Optionally, validate token here if needed (e.g., by calling your backend to verify the token)

    setLoading(false); // Proceed once the check is complete
  }, [router]);

  const deleteAPI = async (apiId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/apis/${apiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // @ts-ignore
      setApis(apis.filter((api) => api.id !== apiId));
    } catch (error) {
      console.error("Error deleting API", error);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <CreateApi onApiCreated={handleApiCreated} />
      </div>
      <h1>Your APIs</h1>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Your APIs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : apis.length === 0 ? (
          <p className="mt-4">You have no APIs yet. Generate one now!</p>
        ) : (
          <ul className="mt-4">
            {apis.map((api) => (
              // @ts-ignore
              <li key={api.id} className="flex justify-between p-4 border rounded shadow-sm">
                {/* @ts-ignore */}
                <span className="text-blue-600">{`http://localhost:5000${api.endpoint}`}</span>
                <button
                // @ts-ignore
                  onClick={() => deleteAPI(api.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Updated the Link to remove the <a> tag */}
        <Link href="/create-api" className="mt-4 text-blue-500">
          Generate New API
        </Link>
      </div>
    </Layout>
  );
}
