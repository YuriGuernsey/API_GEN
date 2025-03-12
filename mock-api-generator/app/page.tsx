"use client"; // Mark as client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LandingPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateApi = () => {
    if (!description) {
      setError("Please describe your API.");
    } else {
      setLoading(true);
      // Simulate API generation process
      setTimeout(() => {
        alert("API generation initiated.");
        setLoading(false);
      }, 1000);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/signup"); // Redirect to sign-up page after email submission
    }, 1000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link href="/" className="text-2xl font-bold text-white">
            MockAPI Generator
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
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Build APIs in Minutes with AI
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleGenerateApi}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Your API"}
          </button>
        </div>

        {/* Email Input for Early Access */}
        <form onSubmit={handleEmailSubmit} className="flex justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-2/3 rounded-l-lg text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Started"}
          </button>
        </form>

        {/* Problem Statement */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">The Problem</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Manually creating APIs can be time-consuming and error-prone. You
            need a solution that allows you to generate APIs quickly and
            efficiently, without writing endless lines of code.
          </p>
        </section>

        {/* Solution Overview */}
        <section className="mt-16 text-center bg-gray-800 py-12">
          <h2 className="text-3xl font-semibold text-white mb-4">Our Solution</h2>
          <p className="text-lg max-w-2xl mx-auto">
            With our platform, you can generate custom API specifications in
            minutes. Just describe what you need, and we'll do the heavy
            lifting for you. Fast, simple, and reliable.
          </p>
        </section>

        {/* Features and Benefits */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">
            Features & Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Fast API Generation</h3>
              <p>Get your custom API ready in minutes with AI-powered generation.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p>Simply describe your API, and let us do the rest. No coding required!</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Built for Developers</h3>
              <p>Developers can further customize, integrate, and scale with ease.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mt-16 bg-gray-800 py-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Free Plan</h3>
              <p className="text-lg mb-4">1 API per month</p>
              <p className="mb-6">Perfect for hobbyists or small projects.</p>
              <Link href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Start for Free
              </Link>
            </div>
            <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
              <p className="text-lg mb-4">$19/month</p>
              <p className="mb-6">Unlimited APIs, premium features, and priority support.</p>
              <Link href="/signup" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                Get Started
              </Link>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise Plan</h3>
              <p className="text-lg mb-4">Custom pricing</p>
              <p className="mb-6">Tailored for large teams with advanced needs.</p>
              <Link href="/contact" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">How does the API generation work?</h3>
              <p>Simply describe your API, and our platform will generate the spec and even mock data.</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">What happens if I exceed my API limit?</h3>
              <p>Upgrade to a paid plan to get access to unlimited API creation and premium features.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-white">
        <p>&copy; 2025 MockAPI Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
