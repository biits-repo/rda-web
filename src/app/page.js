"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/SplashScreen");
    }, 0);
  }, []);
  return <></>;
}

export default page;

