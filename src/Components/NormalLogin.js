"use client";
import React, { useState, useEffect } from "react";
import background from "../../src/assets/splashscreenbg.png";
import { useRouter } from "next/navigation";
import RDALogo from "../../src/assets/RDALogo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function NormalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const route = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.group === "user") {
        route.push("/home");
      } else if (user.group === "admin") {
        route.push("/home");
      } else if (user.group === "superadmin") {
        route.push("/home");
      }
    }
  }, [route]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://expenseapp.creowiz.com/api/radio_login/",
        {
          email,
          password,
        }
      );

      if (
        response.data.message === "Login successful" &&
        response.data?.group === "user"
      ) {
        const userData = {
          email: response.data.user,
          group: response.data.group,
          isLoggedIn: true,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(async () => {
          route.push("/home");
        }, 3000);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="absolute inset-0 bg-[#020113AB] opacity-[76]"></div>
      <div className="absolute top-5 left-5">
        <ToastContainer />
        <img
          src={RDALogo.src}
          alt="Logo"
          className="w-[100px] h-[40%] object-contain"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white px-7 py-4 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-[13px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent pb-2">
            Normal Admin
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
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-[#1C1C1C] text-[16px]">Email</label>
              <input
                placeholder="Enter Your Email"
                className={`bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex flex-row justify-between">
                <label className="text-[#1C1C1C] text-[16px]">Password</label>
                <a
                  href="#"
                  className="text-[#1C1C1C] text-[12px] opacity-70 hover:text-[#145BAF]"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                placeholder="Enter Your Password"
                className={`bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>
            <div className="flex justify-center mt-3.5">
              <button
                type="submit"
                disabled={loading}
                className="align-middle bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] text-white font-bold py-1.5 px-4 rounded-[30px] hover:opacity-90 transition duration-300"
              >
                {loading ? "Loading..." : "LOGIN"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-[lightgray] text-[15px] text-center mt-4 mb-5">
              Don't have an account?{" "}
              <span
                className="text-[#145BAF] hover:cursor-pointer"
                onClick={() => {
                  route.push("/Signup");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalLogin;
