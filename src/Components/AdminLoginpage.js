"use client";
import React from "react";
import background from "../assets/splashscreenbg.png";
import RDALogo from "../assets/RDALogo.png";
import { useRouter } from "next/navigation";

function AdminLoginpage() {
  const route = useRouter();
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="absolute inset-0 bg-[#020113AB] opacity-[76]"></div>
      <div className="absolute top-5 left-5">
        <img
          src={RDALogo.src}
          alt="Logo"
          className="w-[100px] h-[40%] object-contain"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white px-7 py-4 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-[13px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent pb-2">
            Admin
          </p>
          <div>
            <h2 className="text-3xl text-left font-bold text-[#145BAF]">
              Radio Data Analytics
            </h2>
            <p className="text-[#808080] text-[10px]  pt-7">Welcome back !!!</p>
            <p className="text-[#1C1C1C] text-[32px] font-bold py-2 ">
              Sign in
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#1C1C1C] text-[16px]">Email</label>
            <input
              placeholder="Enter Your Registered Email"
              className="bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] opacity-70"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex flex-row justify-between">
              {" "}
              <label className="text-[#1C1C1C] text-[16px]">Password</label>
              <label className="text-[#1C1C1C] text-[14px]">
                <a className="underline hover:cursor-pointer text-[lightgray]">
                  Forgot Password ?
                </a>
              </label>
            </div>
            <input
              placeholder="Enter Your Password"
              className="bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] opacity-70"
              type="password"
            />
          </div>
          <div className="flex justify-center mt-3.5">
            <button
              onClick={() => {
                route.push("home");
              }}
              className="align-middle bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] text-white font-bold py-1.5 px-4 rounded-[30px] hover:opacity-90 transition duration-300"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginpage;
