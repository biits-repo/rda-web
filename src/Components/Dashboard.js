"use client";
import React, { useEffect, useState } from "react";
import GraphLogo from "../assets/sponsordatalogo.png";
import tasklogo from "../assets/tasklogo.png";
import userapproval from "../assets/userapproval.png";
import background from "../assets/dashboardbg.png";
import { useRouter } from "next/navigation";
import RDALogo from "../assets/sidelogo.png";
import texttospeech from "../assets/texttospeech.png";
import { useAuth, getCurrentUser, logout } from "../lib/authUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const route = useRouter();
  const [user, setUser] = useState(null);

  // Use the auth hook to protect this route - allow any authenticated user
  useAuth();

  useEffect(() => {
    // Get the current user from localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    logout(route);
  };

  // Check if user is admin or superadmin
  const isAdminOrSuperAdmin =
    user && (user.group === "admin" || user.group === "superadmin");

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="absolute inset-0 bg-[white] opacity-90"></div>
      <div className="absolute top-5 left-5">
        <img
          src={RDALogo.src}
          alt="Logo"
          className="w-[100px] h-[40%] object-contain"
        />
      </div>

      {/* Logout Button */}

      {/* User Info Display */}
      {user && (
        <div className="absolute top-16 right-5">
          <p className="text-[#145BAF] font-semibold">
            Logged in as: {user.email} ({user.group})
          </p>
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="absolute top-5 right-5">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] text-white font-bold py-1.5 px-4 rounded-[30px] hover:opacity-90 transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen pt-6">
          <div className="flex flex-row items-center justify-center gap-4 ">
            <div
              onClick={() => {
                route.push("SponsorPage");
              }}
              className="bg-[#5DC3F9] w-[400px] flex justify-start pl-4 gap-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
            >
              <div className="content-start">
                <img src={GraphLogo.src} alt="Logo" className="w-13 h-13" />
              </div>
              <div>
                <p className="text-2xl text-[#105174] font-bold">
                  Sponsor Data Graph
                </p>
              </div>
            </div>
            {isAdminOrSuperAdmin && (
              <div
                onClick={() => {
                  route.push("Chunkaudio");
                }}
                className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
              >
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Chunk Audio
                  </p>
                </div>
              </div>
            )}
            {isAdminOrSuperAdmin && (
              <div
                onClick={() => {
                  route.push("AudiotoText");
                }}
                className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
              >
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Audio to Text
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Only show UserApproval for admin or superadmin */}
          <div className="flex flex-row items-center justify-center gap-4 ">
            {isAdminOrSuperAdmin && (
              <div
                onClick={() => {
                  route.push("UserApproval");
                }}
                className="bg-[#BFE3A0] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
              >
                <div className="content-start">
                  <img
                    src={userapproval.src}
                    alt="Logo"
                    className="w-13 h-13"
                  />
                </div>
                <div>
                  <p className="text-2xl text-[#427715] font-bold">
                    User Management
                  </p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div
                onClick={() => {
                  route.push("OCR");
                }}
                className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
              >
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">OCR</p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div
                onClick={() => {
                  route.push("TexttoSpeech");
                }}
                className="bg-[#f3ecb0] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer"
              >
                <div className="content-start">
                  <img
                    src={texttospeech.src}
                    alt="Logo"
                    className="w-13 h-13 bg-transparent"
                  />
                </div>
                <div>
                  <p className="text-2xl text-[#62652f] font-bold">
                    Text to Speech
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Translate (TBD)
                  </p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Text Generation (TBD)
                  </p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    MCP Demo (TBD)
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    AI Agents Demo (TBD)
                  </p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Query Generation (TBD)
                  </p>
                </div>
              </div>
            )}
            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Computer Vision (TBD)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-4">
            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Time Series (TBD)
                  </p>
                </div>
              </div>
            )}

            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">
                    Assistant-Industry Specific (TBD)
                  </p>
                </div>
              </div>
            )}
            {isAdminOrSuperAdmin && (
              <div className="bg-[#D7BBEF] w-[400px] gap-4 flex justify-start pl-4 items-center h-[90px] rounded-lg shadow-lg mb-4 hover:cursor-pointer">
                <div className="content-start">
                  <img src={tasklogo.src} alt="Logo" className="w-13 h-13" />
                </div>
                <div>
                  <p className="text-2xl text-[#813EBA] font-bold">NLP (TBD)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
