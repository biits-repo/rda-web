// "use client";
// import React, { useEffect } from "react";
// import background from "../../../src/assets/splashscreenbg.png";
// import RDALogo from "../../../src/assets/RDALogo.png";
// import { useRouter } from "next/navigation";
// import Profilelogo from "../../../src/assets/profilelogo.png";

// function Page() {
//   const route = useRouter();

//   return (
//     <div
//       className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${background.src})` }}
//     >
//       <div className="absolute inset-0 bg-[#020113AB] opacity-[76]"></div>

//       <div className=" z-10 flex items-center justify-center min-h-screen">
//         <div className="absolute top-5 left-5">
//           <img
//             src={RDALogo.src}
//             alt="Logo"
//             className="w-[100px] h-[40%] object-contain"
//           />
//         </div>

//         <div className="relative flex items-center justify-center flex-col gap-4 ">
//           <div className="text-4xl mt-20 md:mt-0 md:text-[78px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
//             Sign In
//           </div>
//           <div className="flex flex-col md:flex-row ">
//             <div
//               onClick={() => {
//                 route.push("/AdminLogin");
//               }}
//               className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
//             >
//               <img
//                 src={Profilelogo.src}
//                 alt="Logo"
//                 className="w-[100px] mt-5 lg:mt-0 h-[100px] md:w-[200px] md:h-[40%] object-contain"
//               />
//               <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
//                 Admin
//               </p>
//             </div>
//             <div
//               onClick={() => {
//                 route.push("/SuperAdminLogin");
//               }}
//               className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
//             >
//               <img
//                 src={Profilelogo.src}
//                 alt="Logo"
//                 className="w-[100px] mt-5 lg:mt-0  h-[100px] md:w-[200px] md:h-[40%] object-contain"
//               />
//               <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
//                 Super Admin
//               </p>
//             </div>
//             <div
//               onClick={() => {
//                 route.push("/NormalLogin");
//               }}
//               className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
//             >
//               <img
//                 src={Profilelogo.src}
//                 alt="Logo"
//                 className="w-[100px] mt-5 md:mt-0 h-[100px] md:w-[200px] md:h-[40%] object-contain"
//               />
//               <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
//                 Normal User
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";
import React, { useEffect } from "react";
import background from "../../../src/assets/splashscreenbg.png";
import RDALogo from "../../../src/assets/RDALogo.png";
import { useRouter } from "next/navigation";
import Profilelogo from "../../../src/assets/profilelogo.png";

function Page() {
  const route = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.group === "user") {
          route.push("/home");
        } else if (user.group === "admin") {
          route.push("/home");
        } else if (user.group === "superadmin") {
          route.push("/home");
        }
      } catch (error) {
        localStorage.removeItem("userData");
      }
    }
  }, [route]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="absolute inset-0 bg-[#020113AB] opacity-[76]"></div>

      <div className="z-10 flex items-center justify-center min-h-screen">
        <div className="absolute top-5 left-5">
          <img
            src={RDALogo.src}
            alt="Logo"
            className="w-[100px] h-[40%] object-contain"
          />
        </div>

        <div className="relative flex items-center justify-center flex-col gap-4">
          <div className="text-4xl mt-20 md:mt-0 md:text-[78px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
            Sign In
          </div>
          <div className="flex flex-col md:flex-row">
            <div
              onClick={() => {
                route.push("/AdminLogin");
              }}
              className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
            >
              <img
                src={Profilelogo.src}
                alt="Logo"
                className="w-[100px] mt-5 lg:mt-0 h-[100px] md:w-[200px] md:h-[40%] object-contain"
              />
              <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
                Admin
              </p>
            </div>
            <div
              onClick={() => {
                route.push("/SuperAdminLogin");
              }}
              className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
            >
              <img
                src={Profilelogo.src}
                alt="Logo"
                className="w-[100px] mt-5 lg:mt-0 h-[100px] md:w-[200px] md:h-[40%] object-contain"
              />
              <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
                Super Admin
              </p>
            </div>
            <div
              onClick={() => {
                route.push("/NormalLogin");
              }}
              className="flex items-center justify-center flex-col gap-4 hover:cursor-pointer"
            >
              <img
                src={Profilelogo.src}
                alt="Logo"
                className="w-[100px] mt-5 md:mt-0 h-[100px] md:w-[200px] md:h-[40%] object-contain"
              />
              <p className="text-[23px] font-bold bg-gradient-to-r from-[#6FD8EB] to-[#4C35F3] bg-clip-text text-transparent">
                Normal User
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
