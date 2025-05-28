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
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChatBot from "./ChatBot";
// import { toast } from "react-toastify";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function SponsorDataGraph() {
//   const [sponsors, setSponsors] = useState([]);
//   const [selectedSponsors, setSelectedSponsors] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     fetchData();
//     // Demo data has been removed as we'll be using actual API data
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
//       const response = await fetch(
//         "https://expenseapp.creowiz.com/api/get_sponsor_names/"
//       );
//       const data = await response.json();

//       if (data && Array.isArray(data.user_data)) {
//         const formattedSponsors = data.user_data.map((sponsor) => ({
//           id: sponsor.id,
//           name: sponsor.sponsor_name,
//           sponsor_occurence: sponsor.sponsor_occurence,
//           audio_name: sponsor.audio_name,
//         }));

//         setSponsors(formattedSponsors);
//       } else {
//         toast.error("Failed to fetch sponsor data. Please try again later.");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch sponsor data. Please try again later.");
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

//   // Prepare chart data with bar chart
//   const chartData = {
//     labels: sponsors
//       .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//       .map((sponsor) => sponsor.name),
//     datasets: [
//       {
//         type: "bar",
//         label: "Sponsor Occurrences",
//         data: sponsors
//           .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//           .map((sponsor) => sponsor.sponsor_occurence),
//         backgroundColor: "rgba(181, 206, 246, 0.7)",
//         borderColor: "rgb(181, 206, 246)",
//         borderWidth: 0,
//         borderRadius: 6,
//         barThickness: 60,
//         maxBarThickness: 70,
//         minBarLength: 2,
//       },
//       {
//         type: "line",
//         label: "Trend",
//         data: sponsors
//           .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//           .map((sponsor) => {
//             console.log("sponsor_occurencecc", sponsor.sponsor_occurence);
//             return sponsor.sponsor_occurence || 0;
//           }),
//         borderColor: "#D3D3D3",
//         backgroundColor: "#9947FE",
//         borderWidth: 1,
//         pointRadius: 5,
//         pointBackgroundColor: "#808080",
//         pointBorderColor: "white",
//         pointBorderWidth: 2,
//         tension: 0.1,
//         fill: true,
//         borderDash: [5, 5],
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
//           drawBorder: false,
//         },
//         ticks: {
//           stepSize: 10,
//         },
//         border: {
//           display: false,
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         border: {
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
//       <div className="bg-white px-6 py-4">
//         <img
//           src={RdaLogo.src}
//           className="w-[200px] h-[30px] object-contain"
//           alt="Radio AI Logo"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden ">
//         <div className="w-64 bg-white px-4 flex flex-col space-y-4">
//           <div className="bg-[#F1F6FA] p-5 flex-1 rounded-3xl shadow-sm overflow-scroll ">
//             <div className="relative mb-4" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="w-full bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-4 px-4 rounded-[300px] font-medium flex justify-between items-center transition-all hover:from-[#883FE5] hover:to-[#3B1DD1] shadow-sm text-sm"
//               >
//                 <span>Select Sponsor's</span>
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
//                 <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg z-10 flex-1 overflow-y-auto">
//                   {/* Select All Option */}
//                   <div
//                     className="px-4 py-1 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
//                     onClick={toggleSelectAll}
//                   >
//                     <span className="font-medium">Select All</span>
//                     <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
//                       {selectedSponsors.length === sponsors.length && (
//                         <svg
//                           className="w-3 h-3 text-[#9947FE]"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
//                         </svg>
//                       )}
//                     </div>
//                   </div>

//                   {/* Individual Sponsor Options */}
//                   {sponsors.map((sponsor) => (
//                     <div
//                       key={sponsor.id}
//                       className=" px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
//                       onClick={() => toggleSponsor(sponsor.id)}
//                     >
//                       <span>{sponsor.name}</span>
//                       <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
//                         {selectedSponsors.includes(sponsor.id) && (
//                           <svg
//                             className="w-3 h-3 text-[#9947FE]"
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

//             <div className="flex-1">
//               {selectedSponsors.length > 0 && (
//                 <div className="flex flex-col max-h-[500px]">
//                   {sponsors
//                     .filter((sponsor) => selectedSponsors.includes(sponsor.id))
//                     .map((sponsor) => (
//                       <div
//                         key={sponsor.id}
//                         className="bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-3 px-4 overflow-ellipsis rounded-[300px] font-medium flex justify-between items-center mb-2 cursor-pointer"
//                         onClick={() => toggleSponsor(sponsor.id)}
//                       >
//                         <span className="overflow-ellipsis text-[13px]">
//                           {sponsor.name}
//                         </span>
//                         <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                           <svg
//                             className="w-4 h-4 text-[#9947FE]"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
//                           </svg>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex flex-1 overflow-auto">
//           <div className="p-6 bg-[#ECF2F9] rounded-tl-3xl flex-1">
//             <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
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
import { Bar } from "react-chartjs-2";
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
import { toast } from "react-toastify";

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
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
    // Demo data has been removed as we'll be using actual API data
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
      const response = await fetch(
        "https://expenseapp.creowiz.com/api/get_sponsor_names/"
      );
      const data = await response.json();

      if (data && Array.isArray(data.user_data)) {
        // Remove duplicates and combine occurrences
        const sponsorMap = new Map();
        
        data.user_data.forEach((sponsor) => {
          const sponsorName = sponsor.sponsor_name;
          
          if (sponsorMap.has(sponsorName)) {
            // If sponsor already exists, combine the occurrences
            const existingSponsor = sponsorMap.get(sponsorName);
            existingSponsor.sponsor_occurence += sponsor.sponsor_occurence;
            // Keep the first audio_name or combine them if needed
            if (!existingSponsor.audio_name && sponsor.audio_name) {
              existingSponsor.audio_name = sponsor.audio_name;
            }
          } else {
            // New sponsor, add to map
            sponsorMap.set(sponsorName, {
              id: sponsor.id,
              name: sponsorName,
              sponsor_occurence: sponsor.sponsor_occurence,
              audio_name: sponsor.audio_name,
            });
          }
        });

        // Convert map back to array
        const formattedSponsors = Array.from(sponsorMap.values());
        setSponsors(formattedSponsors);
      } else {
        toast.error("Failed to fetch sponsor data. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to fetch sponsor data. Please try again later.");
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

  // Prepare chart data with bar chart
  const selectedSponsorData = sponsors.filter((sponsor) => selectedSponsors.includes(sponsor.id));
  
  const chartData = {
    labels: selectedSponsorData.map((sponsor) => sponsor.name),
    datasets: [
      {
        type: "bar",
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "x",
        label: "Sponsor Occurrences",
        data: selectedSponsorData.map((sponsor) => sponsor.sponsor_occurence),
        backgroundColor: "rgba(181, 206, 246, 0.7)",
        borderColor: "rgb(181, 206, 246)",
        borderWidth: 0,
        borderRadius: 6,
        barThickness: selectedSponsorData.length <= 5 ? 60 : undefined,
        maxBarThickness: 50,
        minBarLength: 2,
        categoryPercentage: selectedSponsorData.length <= 5 ? 0.4 : 0.8,
        barPercentage: selectedSponsorData.length <= 5 ? 0.6 : 0.9,
      },
      {
        type: "line",
        label: "Trend",
        data: selectedSponsorData.map((sponsor) => {
          console.log("sponsor_occurencecc", sponsor.sponsor_occurence);
          return sponsor.sponsor_occurence || 0;
        }),
        borderColor: "#D3D3D3",
        backgroundColor: "#9947FE",
        borderWidth: 1,
        pointRadius: 5,
        pointBackgroundColor: "#808080",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        tension: 0.1,
        fill: true,
        borderDash: [5, 5],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
      <div className="flex flex-1 overflow-hidden ">
        <div className="w-64 bg-white px-4 flex flex-col space-y-4">
          <div className="bg-[#F1F6FA] p-5 flex-1 rounded-3xl shadow-sm overflow-scroll ">
            <div className="relative mb-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-4 px-4 rounded-[300px] font-medium flex justify-between items-center transition-all hover:from-[#883FE5] hover:to-[#3B1DD1] shadow-sm text-sm"
              >
                <span>Select Sponsor's</span>
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
                    className="px-4 py-1 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
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
                      className=" px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
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

            <div className="flex-1">
              {selectedSponsors.length > 0 && (
                <div className="flex flex-col max-h-[500px]">
                  {sponsors
                    .filter((sponsor) => selectedSponsors.includes(sponsor.id))
                    .map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="bg-gradient-to-r from-[#9947FE] to-[#441EED] text-white py-3 px-4 overflow-ellipsis rounded-[300px] font-medium flex justify-between items-center mb-2 cursor-pointer"
                        onClick={() => toggleSponsor(sponsor.id)}
                      >
                        <span className="overflow-ellipsis text-[13px]">
                          {sponsor.name}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#9947FE]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
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