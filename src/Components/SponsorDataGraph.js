"use client";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import { RadioPOCAPI } from "@/app/BackendApi/RadiopocApi";
import Chatbot from "./ChatBot";

function SponsorDataGraph() {
  const [selected, setSelected] = useState([]);
  const [sponsorData, setSponsorData] = useState([]);
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    ApiFetching();
  }, []);

  const ApiFetching = async () => {
    const SponsorRes = await RadioPOCAPI.SponsorData();
    const OccurrencesRes = await RadioPOCAPI.SponsonsorOccurance();
    if (SponsorRes) {
      setSponsorData(SponsorRes?.data);
    }
    if (OccurrencesRes) {
      setOccurrences(OccurrencesRes?.data);
    }
  };

  const formattedOptions = sponsorData?.map((option) => ({
    label: option.name,
    value: option.id,
  }));

  const chartLabels = [];
  const chartData = [];

  selected.forEach((item) => {
    const sponsorOccurrences = occurrences.filter(
      (occurrence) => occurrence.sponsor_id === item.value
    );
    const totalOccurrences = sponsorOccurrences.reduce(
      (sum, occ) => sum + occ.sponsor_occurence,
      0
    );

    chartLabels.push(item.label);
    chartData.push(totalOccurrences);
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Sponsor Occurrences",
        data: chartData,
        backgroundColor: "#2270c3",
        borderColor: "#4e73df",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Select Sponsors</h1>
      <MultiSelect
        options={formattedOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <div className="grid grid-cols-12 h-[40rem]">
        <div className="col-span-3 mt-5">
          {selected.map((item) => (
            <div key={item.value} className="flex items-center space-x-3 mb-2">
              <span className="text-blue-600">{item.label}</span>
              <button
                onClick={() =>
                  setSelected(selected.filter((i) => i.value !== item.value))
                }
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-9 bg-gray-300">
          <div>
            {selected?.length > 0 ? (
              <Bar data={data} options={options} />
            ) : (
              <div className="text-center text-lg font-bold text-gray-600 flex justify-center items-center h-[40rem]">
                <p>Select At Least One Sponsor to show the graph</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Chatbot
        page={"Sponsor Data"}
        sponsorData={sponsorData}
        setSelected={setSelected}
      />
    </div>
  );
}

export default SponsorDataGraph;

//