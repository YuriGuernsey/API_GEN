// app/layout.tsx

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in when the layout is loaded
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true); // If token exists, mark as logged in
    } else {
      setIsLoggedIn(false); // If no token, mark as not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage on logout
    setIsLoggedIn(false); // Update the state to reflect logged out
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            MockAPI Generator
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-white">
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/dashboard" className="text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-white">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 MockAPI Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
