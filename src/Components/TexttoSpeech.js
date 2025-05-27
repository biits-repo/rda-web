"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function TexttoSpeech() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [outputText, setOutputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null); // Reference to audio player

  // Authentication check
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
  }, [router]);

  // File selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Convert file to speech
  const handleConvertToSpeech = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(
        "https://expenseapp.creowiz.com/api/convert_to_speech/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const filePath = res.data.audio_file;
        setOutputText(filePath);
        toast.success("Speech generated successfully!");
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }, 500);
      } else {
        toast.error("Failed to convert to speech");
      }
    } catch (error) {
      toast.error("Failed to convert. Try a different file.");
    } finally {
      setLoading(false);
    }
  };

  // Download audio file
  const handleDownload = async (path) => {
    const response = await fetch("https://expenseapp.creowiz.com" + path);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speech.mp3";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3">Verifying permissions...</p>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          🗣️ Text-to-Speech Converter
        </h1>
        <p className="text-center text-gray-600 mb-8 font-bold">
          Upload your document file to convert its content into speech.
        </p>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              📁 Choose a text file
            </label>
            <input
              type="file"
              accept=".txt,.text,text/plain"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvertToSpeech}
            disabled={!selectedFile || loading}
            className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition ${
              loading
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "🔄 Converting..." : "🎧 Convert to Speech"}
          </button>

          {/* Audio Preview + Download */}
          {outputText && (
            <div className="space-y-4">
              <audio
                ref={audioRef}
                controls
                className="w-full mt-4"
                src={`https://expenseapp.creowiz.com${outputText}`}
              >
                Your browser does not support the audio element.
              </audio>

              <button
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition"
                onClick={() => handleDownload(outputText)}
              >
                📥 Download Speech MP3
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TexttoSpeech;
