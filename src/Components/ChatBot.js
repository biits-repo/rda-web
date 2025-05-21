"use client";
import { useEffect, useRef, useState } from "react";
import messageicon from "../assets/messageicon.png";
import { IoSend } from "react-icons/io5";

const ChatBot = ({ page, sponsorData, setSelected }) => {
  const scrollRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeSponsor, setActiveSponsor] = useState(null);

  useEffect(() => {
    if (sponsorData && sponsorData.length > 0) {
      setActiveSponsor(sponsorData[0].name);
    }
  }, [sponsorData]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, type: "user" }]);
    processMessage(input);

    setInput("");
  };

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check if message contains "sponsor data"
    if (lowerMessage.includes("sponsor data")) {
      if (lowerMessage.includes("all")) {
        // Show all sponsors
        const allSponsors = sponsorData.map((sponsor) => ({
          label: sponsor.name,
          value: sponsor.id,
        }));
        setSelected(allSponsors);

        setMessages((messages) => [
          ...messages,
          {
            text: "Showing Data For All Sponsors...\nLet Me Know",
            type: "bot",
          },
        ]);
      } else {
        // Look for specific sponsor names in the message
        const requestedSponsors = [];

        sponsorData.forEach((sponsor) => {
          if (lowerMessage.includes(sponsor.name.toLowerCase())) {
            requestedSponsors.push({
              label: sponsor.name,
              value: sponsor.id,
            });
          }
        });

        if (requestedSponsors.length > 0) {
          setSelected(requestedSponsors);

          setMessages((messages) => [
            ...messages,
            {
              text: `Showing data for: ${requestedSponsors
                .map((s) => s.label)
                .join(", ")}`,
              type: "bot",
            },
          ]);
        } else {
          setMessages((messages) => [
            ...messages,
            {
              text: "Sorry, I couldn't find the sponsors you mentioned. Please try again with valid sponsor names.",
              type: "bot",
            },
          ]);
        }
      }
    } else if (lowerMessage.includes("thank")) {
      setMessages((messages) => [
        ...messages,
        {
          text: "You're welcome! Let me know if you need anything else.",
          type: "bot",
        },
      ]);
    } else {
      // Default response for other inputs
      setMessages((messages) => [
        ...messages,
        {
          text: "Try asking for sponsor data. For example: 'sponsor data: Hyundai' or 'sponsor data: all'",
          type: "bot",
        },
      ]);
    }
  };

  // Function to handle quick reply buttons
  const handleQuickReply = (message) => {
    setMessages([...messages, { text: message, type: "user" }]);
    processMessage(message);
  };

  return (
    <>
      {page === "Sponsor Data" && (
        <div className="fixed bottom-2 right-2 z-50">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 bg-gradient-to-b from-[#9947FE] to-[#441EED] text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            >
              <img
                src={messageicon.src}
                alt="Chatbot Icon"
                className="w-7 h-7"
              />
            </button>
          )}

          {isOpen && (
            <div className="w-96 max-w-full rounded-lg bg-white shadow-xl transition-all duration-300 overflow-hidden">
              {/* Chat Header with Wave Background */}
              <div className="relative bg-gradient-to-r from-[#461FED] to-[#9746FE] text-white py-2 px-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold mb-1">
                  Chat with Radio Data Analytics
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  We typically reply in few minutes
                </p>
              </div>
              <div className="px-4 py-2 overflow-y-auto min-h-[300px] max-h-[300px]">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-[10px] px-4 py-3 max-w-[80%] break-words ${
                        message.type === "user"
                          ? "bg-gradient-to-b from-[#471FEE] to-[#9746FE] text-[#FFFFFF]"
                          : "bg-[#EFF2F7] text-[#1C1C1C]"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.text}
                      </p>

                      {/* Feedback buttons only for bot messages */}
                      {/* {message.type === "bot" && (
                        <div className="flex space-x-2 mt-2 justify-center">
                          <button className="text-gray-500 hover:text-blue-500">
                            <span role="img" aria-label="thumbs up">
                              👍
                            </span>
                          </button>
                          <button className="text-gray-500 hover:text-red-500">
                            <span role="img" aria-label="thumbs down">
                              👎
                            </span>
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />

                {/* Example user message with quick reply */}
                {messages.length === 0 && (
                  <>
                    <div className="flex justify-start mb-4">
                      <div className="rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 max-w-[80%]">
                        <p className="text-sm whitespace-pre-line">
                          Ask Any Data
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t  border-gray-200 mx-6 -mb-3.5"></div>
              <div className=" border-gray-200 p-4">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    className="flex-1 border-0 focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-400 text-sm"
                    placeholder="Enter Your Message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="bg-gradient-to-r mt-6 from-[#471FEE] to-[#9746FE] text-[#FFFFFF]  rounded-full w-10 h-10 flex items-center justify-center hover:[#4880FF] transition-colors"
                  >
                    <IoSend color="white" size={19} />
                  </button>
                </form>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 mx-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
