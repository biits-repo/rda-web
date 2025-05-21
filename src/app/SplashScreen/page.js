'use client'
import React, { useEffect } from "react";
import background from "../../../src/assets/splashscreenbg.png";
import RDALogo from "../../../src/assets/RDALogo.png";
import { useRouter } from "next/navigation";

function Page() {
  const route = useRouter();
  useEffect(() => {
    setTimeout(() => {
      route.push("/entrancelogin");
    }, 2000);
  }, []);
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="absolute inset-0 bg-[#020113AB] opacity-[76]"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        
        <div>
          <img
            src={RDALogo.src}
            alt="Logo"
            className="w-[800px] h-[40%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
