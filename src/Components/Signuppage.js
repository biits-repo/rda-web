"use client";
import React, { useState, useEffect } from "react";
import background from "../../src/assets/splashscreenbg.png";
import { useRouter } from "next/navigation";
import RDALogo from "../../src/assets/RDALogo.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signuppage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const route = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      // Redirect based on user group
      if (user.group === "user") {
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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://expenseapp.creowiz.com/api/register_radio_user/",
        {
          email,
          password,
          group: "user",
        }
      );

      if (response.data.message === "User registered successfully") {
        toast.success("Registration successful! Please login.", {
          position: "top-right",
          autoClose: 3000,
        });

        // Redirect to login page after a short delay
        setTimeout(() => {
          route.push("/NormalLogin");
        }, 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        toast.error("Registration failed. Please try again later.");
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
      <ToastContainer />
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
          <div>
            <h2 className="text-3xl text-center font-bold text-[#145BAF]">
              Radio Data Analytics
            </h2>
            <p className="text-[#1C1C1C] text-[16px] pt-10">Hello !!!</p>
            <p className="text-[#1C1C1C] text-[32px] font-bold py-2">Sign Up</p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-2">
              <label className="text-[#1C1C1C] text-[16px]">Email</label>
              <input
                placeholder="Enter Your Email"
                className={`bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] opacity-70 ${
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
              </div>
              <input
                placeholder="Enter Your Password"
                className={`bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] opacity-70 ${
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
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex flex-row justify-between">
                <label className="text-[#1C1C1C] text-[16px]">
                  Confirm Password
                </label>
              </div>
              <input
                placeholder="Enter Your Password Again"
                className={`bg-[#EAF4FF] rounded-[3px] p-2 text-[12px] opacity-70 ${
                  errors.confirmPassword ? "border-2 border-red-500" : ""
                }`}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="flex justify-center mt-3.5">
              <button
                type="submit"
                disabled={loading}
                className="align-middle bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] text-white font-bold py-1.5 px-4 rounded-[30px] hover:opacity-90 transition duration-300"
              >
                {loading ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-[lightgray] text-[15px] text-center mt-4 mb-5">
              Already have an account?{" "}
              <span
                className="text-[#145BAF] hover:cursor-pointer"
                onClick={() => {
                  route.push("/NormalLogin");
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
