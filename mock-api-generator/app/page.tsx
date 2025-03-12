// app/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LandingPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateApi = () => {
    if (!description) {
      alert("Please describe your API.");
    } else {
      setLoading(true);
      // Simulate API generation process
      setTimeout(() => {
        alert("API generation initiated.");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link href="/" className="text-2xl font-bold text-white">
            YourProjectName
          </Link>
          <div className="space-x-4">
            <Link href="/signup" className="text-white hover:text-gray-400">
              Sign Up
            </Link>
            <Link href="/login" className="text-white hover:text-gray-400">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Empower Your Development with AI-Driven API Generation
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Describe your API requirements, and our platform will generate the
          specifications in real-time, streamlining your development process.
        </p>

        {/* API Description Input */}
        <div className="w-full max-w-lg mb-6">
          <textarea
            placeholder="Describe your API here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-4 text-black rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateApi}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate API"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2025 YourProjectName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
