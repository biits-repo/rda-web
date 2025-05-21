// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { RadioPOCAPI } from "@/app/BackendApi/RadiopocApi";
// import RdaLogo from "../assets/radioailogo.png";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChatBot from "./ChatBot";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function SponsorDataGraph() {
//   const [sponsors, setSponsors] = useState([]);
//   const [occurrences, setOccurrences] = useState([]);
//   const [selectedSponsors, setSelectedSponsors] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     // fetchData();

//     setSponsors([
//       { audio_id: 709, sponsor_id: 43, sponsor_occurence: 4 },
//       { audio_id: 709, sponsor_id: 45, sponsor_occurence: 4 },
//       { audio_id: 709, sponsor_id: 46, sponsor_occurence: 4 },
//       { audio_id: 709, sponsor_id: 47, sponsor_occurence: 4 },
//       { audio_id: 709, sponsor_id: 49, sponsor_occurence: 2 },
//       { audio_id: 709, sponsor_id: 44, sponsor_occurence: 2 },
//       { audio_id: 709, sponsor_id: 48, sponsor_occurence: 2 },
//     ]);

//     setOccurrences([
//       { sponsor_id: 43, sponsor_occurence: 4 },
//       { sponsor_id: 45, sponsor_occurence: 4 },
//       { sponsor_id: 46, sponsor_occurence: 4 },
//       { sponsor_id: 47, sponsor_occurence: 4 },
//       { sponsor_id: 49, sponsor_occurence: 2 },
//       { sponsor_id: 44, sponsor_occurence: 2 },
//       { sponsor_id: 48, sponsor_occurence: 2 },
//     ]);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   const fetchData = async () => {
//     try {
//       const sponsorRes = await RadioPOCAPI.SponsorData();
//       const occurrencesRes = await RadioPOCAPI.SponsonsorOccurance();

//       if (sponsorRes?.data) {
//         setSponsors(sponsorRes.data);
//       }

//       if (occurrencesRes?.data) {
//         setOccurrences(occurrencesRes.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const toggleSponsor = (sponsorId) => {
//     setSelectedSponsors((prev) => {
//       if (prev.includes(sponsorId)) {
//         return prev.filter((id) => id !== sponsorId);
//       } else {
//         return [...prev, sponsorId];
//       }
//     });
//   };

//   const toggleSelectAll = () => {
//     if (selectedSponsors.length === sponsors.length) {
//       setSelectedSponsors([]);
//     } else {
//       setSelectedSponsors(sponsors.map((sponsor) => sponsor.id));
//     }
//   };

//   const chartData = {
//     labels: sponsors
//       .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//       .map((sponsor) => sponsor.name),
//     datasets: [
//       {
//         label: "Sponsor Occurrences",
//         data: sponsors
//           .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//           .map((sponsor) => {
//             const occurrenceData = occurrences.find(
//               (o) => o.sponsor_id === sponsor.id
//             );
//             return occurrenceData ? occurrenceData.sponsor_occurence : 0;
//           }),
//         backgroundColor: "rgba(100, 170, 255, 0.7)",
//         borderColor: "rgb(75, 150, 255)",
//         borderWidth: 1,
//         barThickness: 60,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         backgroundColor: "rgba(0, 82, 179, 0.8)",
//         titleColor: "white",
//         bodyColor: "white",
//         padding: 12,
//         cornerRadius: 8,
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: "easeOutQuart",
//     },
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Top Logo Area */}
//       <div className="bg-white px-6 py-4 ">
//         <img
//           src={RdaLogo.src}
//           className="w-[200px] h-[30px] object-contain"
//           alt="Radio AI Logo"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         <div className="w-64 bg-white  px-4 flex flex-col space-y-4">
//           <div className="bg-[#F1F6FA] p-5  flex-1 rounded-3xl shadow-small">
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="w-full bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-3 px-4 rounded-[300px] font-medium flex justify-between items-center transition-all hover:from-[#883FE5] hover:to-[#3B1DD1] shadow-sm text-sm"
//               >
//                 <span>Select Sponsors</span>
//                 <svg
//                   className={`w-4 h-4 transition-transform ${
//                     dropdownOpen ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   ></path>
//                 </svg>
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-[300px] overflow-y-auto">
//                   <div
//                     className="p-3 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50"
//                     onClick={toggleSelectAll}
//                   >
//                     <span className="font-medium text-sm">Select All</span>
//                     <div
//                       className={`w-4 h-4 rounded border flex items-center justify-center ${
//                         selectedSponsors.length === sponsors.length
//                           ? "border-blue-500 bg-blue-500 text-white"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {selectedSponsors.length === sponsors.length && (
//                         <svg
//                           className="w-3 h-3"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
//                         </svg>
//                       )}
//                     </div>
//                   </div>

//                   {sponsors.map((sponsor, index) => (
//                     <div
//                       key={sponsor.sponsor_id}
//                       className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
//                         index < sponsors.length - 1
//                           ? "border-b border-gray-50"
//                           : ""
//                       }`}
//                       onClick={() => toggleSponsor(sponsor.id)}
//                     >
//                       <span className="text-sm">{sponsor.name}</span>
//                       <div
//                         className={`w-4 h-4 rounded border flex items-center justify-center ${
//                           selectedSponsors.includes(sponsor.id)
//                             ? "border-blue-500 bg-blue-500 text-white"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         {selectedSponsors.includes(sponsor.id) && (
//                           <svg
//                             className="w-3 h-3"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
//                           </svg>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="overflow-y-auto flex-1">
//               {selectedSponsors.length > 0 && (
//                 <div className="text-xs text-gray-500 mb-2 font-medium">
//                   Selected sponsors:
//                 </div>
//               )}
//               {sponsors
//                 .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//                 .map((sponsor) => (
//                   <div
//                     key={sponsor.id}
//                     className="bg-gray-50 mb-2 p-2 rounded flex justify-between items-center text-sm"
//                   >
//                     <span className="text-gray-700">{sponsor.name}</span>
//                     <button
//                       className="text-gray-400 hover:text-gray-600"
//                       onClick={() => toggleSponsor(sponsor.id)}
//                     >
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex flex-1  overflow-auto">
//           <div className="p-6 bg-[#ECF2F9] rounded-tl-3xl flex-1">
//             <div className="bg-white  shadow-sm h-full flex flex-col">
//               {/* <div className="p-4 border-b border-gray-100">
//               <h2 className="text-gray-700 text-lg font-medium">
//                 {selectedSponsors.length > 0 ? "Sponsor Occurrences" : "Select Sponsors"}
//               </h2>
//             </div> */}

//               <div className="flex-1 flex items-center justify-center p-4">
//                 {selectedSponsors.length > 0 ? (
//                   <div className="h-full w-full">
//                     <Bar data={chartData} options={chartOptions} />
//                   </div>
//                 ) : (
//                   <div className="text-gray-400 text-center">
//                     <p>Select at least one sponsor to show the graphs.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat Bot - Preserved as requested */}
//       <ChatBot
//         page={"Sponsor Data"}
//         sponsorData={sponsors}
//         setSelected={(selectedOptions) => {
//           setSelectedSponsors(selectedOptions.map((option) => option.value));
//         }}
//       />
//     </div>
//   );
// }

// export default SponsorDataGraph;

"use client";
import React, { useEffect, useState, useRef } from "react";
import { RadioPOCAPI } from "@/app/BackendApi/RadiopocApi";
import RdaLogo from "../assets/radioailogo.png";
import { Bar , Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChatBot from "./ChatBot";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function SponsorDataGraph() {
  const [sponsors, setSponsors] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // fetchData();
    const demoSponsors = [
      { id: 43, name: "Reliance", sponsor_occurence: 23 },
      { id: 45, name: "Angela Swim School", sponsor_occurence: 57 },
      { id: 46, name: "Flipkart", sponsor_occurence: 64 },
      { id: 47, name: "Amazon", sponsor_occurence: 79 },
      { id: 49, name: "Decathlon", sponsor_occurence: 28 },
      { id: 44, name: "Tata", sponsor_occurence: 42 },
    ];

    setSponsors(demoSponsors);

    setOccurrences([
      { sponsor_id: 43, sponsor_occurence: 23 },
      { sponsor_id: 45, sponsor_occurence: 57 },
      { sponsor_id: 46, sponsor_occurence: 64 },
      { sponsor_id: 47, sponsor_occurence: 79 },
      { sponsor_id: 49, sponsor_occurence: 28 },
      { sponsor_id: 44, sponsor_occurence: 42 },
    ]);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const fetchData = async () => {
    try {
      const sponsorRes = await RadioPOCAPI.SponsorData();
      const occurrencesRes = await RadioPOCAPI.SponsonsorOccurance();

      if (sponsorRes?.data) {
        setSponsors(sponsorRes.data);
      }

      if (occurrencesRes?.data) {
        setOccurrences(occurrencesRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSponsor = (sponsorId) => {
    setSelectedSponsors((prev) => {
      if (prev.includes(sponsorId)) {
        return prev.filter((id) => id !== sponsorId);
      } else {
        return [...prev, sponsorId];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedSponsors.length === sponsors.length) {
      setSelectedSponsors([]);
    } else {
      setSelectedSponsors(sponsors.map((sponsor) => sponsor.id));
    }
  };

  // Prepare chart data with both bar and line
  const chartData = {
    labels: sponsors
      .filter((sponsor) => selectedSponsors.includes(sponsor.id))
      .map((sponsor) => sponsor.name),
    datasets: [
      {
        type: "bar",
        label: "Sponsor Occurrences",
        data: sponsors
          .filter((sponsor) => selectedSponsors.includes(sponsor.id))
          .map((sponsor) => {
            const occurrenceData = occurrences.find(
              (o) => o.sponsor_id === sponsor.id
            );
            return occurrenceData ? occurrenceData.sponsor_occurence : 0;
          }),
        backgroundColor: "rgba(181, 206, 246, 0.7)",
        borderColor: "rgb(181, 206, 246)",
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 60,
      },
      // {
      //   type: "line",
      //   label: "Trend",
      //   data: sponsors
      //     .filter((sponsor) => selectedSponsors.includes(sponsor.id))
      //     .map((sponsor) => {
      //       const occurrenceData = occurrences.find(
      //         (o) => o.sponsor_id === sponsor.id
      //       );
      //       return occurrenceData ? occurrenceData.sponsor_occurence : 0;
      //     }),
      //   borderColor: "#D3D3D3",
      //   backgroundColor: "#9947FE",
      //   borderWidth: 1,
      //   pointRadius: 5,
      //   pointBackgroundColor: "#808080",
      //   pointBorderColor: "white",
      //   pointBorderWidth: 2,
      //   tension: 0.1,
      //   fill: true,
      //   borderDash: [5, 5],
      // },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          stepSize: 10,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 82, 179, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        padding: 12,
        cornerRadius: 8,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Logo Area */}
      <div className="bg-white px-6 py-4">
        <img
          src={RdaLogo.src}
          className="w-[200px] h-[30px] object-contain"
          alt="Radio AI Logo"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white px-4 flex flex-col space-y-4">
          <div className="bg-[#F1F6FA] p-5 flex-1 rounded-3xl shadow-sm">
            <div className="relative mb-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-3 px-3 rounded-[300px] font-medium flex justify-between items-center transition-all hover:from-[#883FE5] hover:to-[#3B1DD1] shadow-sm text-sm"
              >
                <span>Select Any Sponsor's</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg z-10 flex-1 overflow-y-auto">
                  {/* Select All Option */}
                  <div
                    className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                    onClick={toggleSelectAll}
                  >
                    <span className="font-medium">Select All</span>
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
                      {selectedSponsors.length === sponsors.length && (
                        <svg
                          className="w-3 h-3 text-[#9947FE]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Individual Sponsor Options */}
                  {sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                      onClick={() => toggleSponsor(sponsor.id)}
                    >
                      <span>{sponsor.name}</span>
                      <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
                        {selectedSponsors.includes(sponsor.id) && (
                          <svg
                            className="w-3 h-3 text-[#9947FE]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {selectedSponsors.length > 0 && (
                <div className="mb-2">
                  {sponsors
                    .filter((sponsor) => selectedSponsors.includes(sponsor.id))
                    .map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-3 px-3 overflow-ellipsis  rounded-[300px] font-medium flex justify-between items-center mb-2 cursor-pointer"
                        onClick={() => toggleSponsor(sponsor.id)}
                      >
                        <span className="overflow-ellipsis text-[13px]">{sponsor.name}</span>
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#9947FE]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-auto">
          <div className="p-6 bg-[#ECF2F9] rounded-tl-3xl flex-1">
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center p-4">
                {selectedSponsors.length > 0 ? (
                  <div className="h-full w-full">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <p>Select at least one sponsor to show the graphs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bot - Preserved as requested */}
      <ChatBot
        page={"Sponsor Data"}
        sponsorData={sponsors}
        setSelected={(selectedOptions) => {
          setSelectedSponsors(selectedOptions.map((option) => option.value));
        }}
      />
    </div>
  );
}

export default SponsorDataGraph;
