"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function OCRPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState(""); // State to store textarea input
  const [outputText, setOutputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  // Function to handle file selection (called when file is selected)
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the file directly from event

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Check file type
    if (!file.type.includes("text") && !file.name.endsWith(".txt")) {
      alert("Please select a text file (.txt)");
      return;
    }

    // Set the selected file state
    setSelectedFile(file);

    // Create FileReader to read the file
    const reader = new FileReader();

    // Set up what happens when file is read
    reader.onload = (e) => {
      const fileContent = e.target.result;

      // Print the extracted text
      console.log("=== FILE READING COMPLETE ===");
      console.log("File name:", file.name);
      console.log("File size:", file.size, "bytes");
      console.log("File type:", file.type);
      console.log("=== EXTRACTED TEXT CONTENT ===");
      console.log(fileContent);
      console.log("=== END OF FILE CONTENT ===");

      // Set the text for display/further processing
      setText(fileContent);
      setOutputText(fileContent);
    };

    // Handle errors
    reader.onerror = () => {
      console.error("Error reading file");
      alert("Error reading the file");
    };

    // Start reading the file as text
    reader.readAsText(file);
  };

  // Function to handle Convert to Speech button click
  const handleConvertToSpeech = async () => {
    const url = "http://127.0.0.1:8000/api/convert_to_speech/";
    const param = {
      data: outputText,
    };

    console.log("Sending data to Python API:", param);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log("API Response:", result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4 py-10">
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
              accept=".txt,.text,text/plain"
              onChange={handleFileSelect}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
            />
          </div>

          {selectedFile && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800 font-semibold">📄 File Loaded:</p>
              <p className="text-green-700">{selectedFile.name}</p>
              <p className="text-green-600 text-sm">
                Size: {selectedFile.size} bytes | Characters: {text.length}
              </p>
            </div>
          )}

          <button
            onClick={handleConvertToSpeech}
            disabled={!selectedFile || !text}
            className="w-full bg-blue-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            🧠 Process OCR 
          </button>

          {/* {outputText && (
            <div className="mt-6 bg-gray-100 rounded-md p-4 shadow-inner">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                📜 Extracted Text
              </h3>
              <div className="max-h-60 overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-gray-300">
                <pre>{outputText}</pre>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default OCRPage;
