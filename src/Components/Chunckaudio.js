"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

function Chunckaudio() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");

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

  const handleChunkAudio = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chunking/", {
        start_time: selectedTime,
      });

      if (res.status === 200) {
        toast.success(res.message || "Audio chunking started successfully");
      }
    } catch (error) {
      toast.error("Error while chunking audio");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-10">
      <div className="w-full max-w-xl bg-white border border-indigo-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-2">
          ⏱ Scheduled Task Runner
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Select a time from the list below and click{" "}
          <span className="font-semibold text-indigo-600">Start Task</span>. The
          app will wait until the scheduled time and then execute the task.
        </p>

        {/* Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="scheduledTime"
            className="block text-gray-700 font-medium mb-2"
          >
            Select a Scheduled Time
          </label>
          <select
            id="scheduledTime"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="">-- Choose Time --</option>
            <option value="00:00">00:00</option>
            <option value="02:00">02:00</option>
            <option value="02:45">02:45</option>
            <option value="03:30">03:30</option>
            <option value="05:00">05:00</option>
          </select>
        </div>

        {/* Selected Time Display */}
        {selectedTime && (
          <div className="mb-6 text-indigo-600 text-center text-lg font-medium">
            ✅ You have selected:{" "}
            <span className="text-indigo-800 font-bold">{selectedTime}</span>
          </div>
        )}

        {/* Start Task Button */}
        <button
          onClick={handleChunkAudio}
          disabled={!selectedTime}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          🚀 Start Task
        </button>
      </div>
    </div>
  );
}

export default Chunckaudio;
