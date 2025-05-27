"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function OCRPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [outputText, setOutputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3">Verifying permissions...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConvertToSpeech = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf_file", selectedFile);

      const res = await axios.post(
        "https://expenseapp.creowiz.com/api/extract_text/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setOutputText(res.data.text_file_path);
        toast.success("OCR processed successfully!");
        setLoading(false);
      } else {
        toast.error("Failed to process OCR");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to process OCR try different file");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (outputText) => {
    const response = await fetch("https://expenseapp.creowiz.com" + outputText);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filename.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          OCR Text Extractor
        </h1>
        <p className="text-center text-gray-600 mb-8 font-bold">
          Upload your file to extract text
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Text File
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileSelect}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
            />
          </div>

          <button
            onClick={handleConvertToSpeech}
            disabled={!selectedFile || loading}
            className={`w-full py-2 px-6 rounded-md text-lg font-semibold transition ${
              loading
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "🧠 Process OCR"}
          </button>

          {outputText && (
            <button
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition"
              onClick={() => handleDownload(outputText)}
            >
              📥 Download Extracted Text
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OCRPage;

// 'https://expenseapp.creowiz.com'+outputText
