"use client";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div className="flex justify-start flex-col">
      <div
        onClick={() => {
          router.push("SponsorPage");
        }}
        className="bg-gray-400 inline-block p-2 mt-4 rounded-4xl hover:cursor-pointer w-[20%]"
      >
        <p className="text-black text-center text-[20px]">Sponsor Data Graph</p>
      </div>
      <div className="bg-gray-400 inline-block p-2 mt-4 rounded-4xl hover:cursor-pointer w-[20%]">
        <p className="text-black text-center text-[20px]">Upcoming Task</p>
      </div>
    </div>
  );
}

export default page;
