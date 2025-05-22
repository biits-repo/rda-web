"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function TexttoSpeech() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = () => {
      try {
        // Get user data from cookies/localStorage
        const userDataStr =
          localStorage.getItem("userData") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("userData="))
            ?.split("=")[1];

        if (!userDataStr) {
          // No user data found, redirect to login
          router.push("/");
          return;
        }

        // Parse user data
        const userData = JSON.parse(userDataStr);

        // Check if user has admin or superadmin role
        if (
          userData &&
          (userData.group === "admin" || userData.group === "superadmin")
        ) {
          setIsAuthorized(true);
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3">Verifying permissions...</p>
      </div>
    );
  }

  // If not authorized, don't render anything (the redirect will happen)
  if (!isAuthorized) {
    return null;
  }

  // Original component content (only shown to authorized users)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Text to Speech</h1>

      {/* Your TextToSpeech component content goes here */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Enter text to convert
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="5"
            placeholder="Type or paste text here..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Voice Options</label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option value="female">Female Voice</option>
            <option value="male">Male Voice</option>
            <option value="neutral">Neutral Voice</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Convert to Speech
        </button>
      </div>
    </div>
  );
}

export default TexttoSpeech;
