"use client";
import { useState } from "react";

export default function FormTabs() {
  const [activeTab, setActiveTab] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState({
    parameters: "Promotional",
    options1: "Credit",
    options2: "Regional",
    options3: "Cash",
    options4: "Cash In Advance",
    options5: "Calendar Month",
    optionsSecondary: null,
    production: "Change Rotation",
    continuity: "New",
  });

  const handleOptionSelect = (category, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [category]: option,
    });
  };

  const renderOptions = (category, options, selectedOption) => {
    return (
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center justify-between p-3 bg-white rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleOptionSelect(category, option)}
          >
            <span className="text-sm font-medium text-gray-700">{option}</span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedOption === option ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              {selectedOption === option && (
                <div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 bg-white rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Form Tabs */}
      <div className="flex border-b mb-6">
        {[1, 2, 3].map((tab) => (
          <buttn
            key={tab}
            className={`relative py-4 px-6 font-medium text-sm ${
              activeTab === tab ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            FORM {tab}
            {activeTab === tab && (
              <div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </buttn>
        ))}
      </div>

      {/* Form Content */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Select Parameters</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "parameters",
              [
                "Announcement",
                "Sponsorship",
                "Political",
                "Public Service",
                "Promotional",
              ],
              selectedOptions.parameters
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "optionsSecondary",
              ["Agency", "Direct"],
              selectedOptions.optionsSecondary
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Production</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "production",
              ["New", "No Change", "Change Rotation", "Form Attached"],
              selectedOptions.production
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "options1",
              [
                "Same Flight",
                "Same Week",
                "Extend Schedule",
                "Dollar or Dollar",
                "Credit",
                "Ask Sales Serson",
              ],
              selectedOptions.options1
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Continuity</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "continuity",
              ["New", "No Change", "Change Rotation", "Form Attached"],
              selectedOptions.continuity
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "options2",
              ["Local", "Regional", "National"],
              selectedOptions.options2
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "options3",
              ["Cash", "Trade", "Non Commercial"],
              selectedOptions.options3
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "options4",
              ["Remit Invoice", "Cash In Advance"],
              selectedOptions.options4
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-600 font-medium">Options</h3>
              <span className="text-xs text-gray-400">select any one</span>
            </div>
            {renderOptions(
              "options5",
              ["Stand Broadcast Month", "Calendar Month"],
              selectedOptions.options5
            )}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="my-8">
        <div className="w-full h-1 bg-gray-200 rounded-full">
          <div className="w-1/3 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white py-3 px-12 rounded-md font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
