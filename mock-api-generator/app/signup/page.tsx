// app/signup/page.tsx

"use client"; // This will mark the file as a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";  // Use next/navigation for useRouter in App Router
import axios from "axios";

const SignUp = () => {
  const router = useRouter();  // Now the router should work properly in the client-side
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/register", { email, password });
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      router.push("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignUp;
