"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function AudiotoTextPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState(""); // State to store textarea input
  const [outputTextPath, setOutputTextPath] = useState("");
  const [loading, setLoading] = useState(false);

  const getPath = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:10000/get_path/");
      if (res.status === 200) {
        toast.success("Path fetched successfully");
        setOutputTextPath(res.data.chunk_dir);
      } else {
        toast.error("Failed to fetch path");
      }
    } catch (error) {
      toast.error("Failed to fetch path");
    }
  };
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userDataStr =
          localStorage.getItem("userData") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("userData="))
            ?.split("=")[1];

        if (!userDataStr) {
          router.push("/");
          return;
        }

        const userData = JSON.parse(userDataStr);

        if (
          userData &&
          (userData.group === "admin" || userData.group === "superadmin")
        ) {
          setIsAuthorized(true);
        } else {
          router.push("/Dashboard");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    getPath();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3">Verifying permissions...</p>
      </div>
    );
  }

  console.log("tyoeof ", typeof outputTextPath);

  if (!isAuthorized) {
    return null;
  }
  // Function to handle Convert to Speech button click
  const handleConvertToSpeech = async () => {
    setLoading(true);
    const requestBody = {
      chunk_path: "C:\\Users\\mohammad.adeeb\\ChunkingScheduler\\Chunks",
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/start_script/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json(); // ✅ parse the JSON

      console.log("Response message:", data.message);
      console.log("Raw response body:", res.body);
      console.log("Response status:", res.status);

      if (res.status === 200) {
        toast.success(data.message);
        setLoading(false);
      } else {
        toast.error(`Error ${res.status}: ${data.detail || "Unknown error"}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to start script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          🎤 Audio to Text Transcription
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload an{" "}
          <span className="font-semibold text-purple-600">audio file</span> to
          convert it into readable text.
        </p>

        <div>
          <p className="text-center text-gray-600 mb-8">
            <span className="font-semibold text-purple-600">audio file</span> to{" "}
            {outputTextPath}
          </p>
        </div>

        <div className="space-y-6">
          {/* Button */}
          <button
            onClick={handleConvertToSpeech}
            disabled={!outputTextPath || loading}
            className={`w-full bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Transcribing....." : "🧠 Transcribe Audio"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AudiotoTextPage;
